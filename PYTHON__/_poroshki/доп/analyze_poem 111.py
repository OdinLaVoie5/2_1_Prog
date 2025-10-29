# analyze_poem.py
import re 
from accentize_text import accentize_text, lookup_rings
from clean import transform_lines_and_log, normalize_text

""" Используется в gpt_poroshki.py """

"""  ??? поправить     АНАЛИЗ ПОРОШКА ПО РИТМУ И РАЗМЕРУ
На входе - текст порошка (с подписью и рейтингом)
На выходе - текст порошка (без подписи и рейтинга) с расставленными ударениями (плюс перед ударной гласной) или None, если порошок не прошёл проверку.
На "ё" ставит ударение автоматически (исключая слова с безударным "ё" по словапю).
Дополнительно - проверяет текст на разрывы слов и кольца (слова на стыке строк). 
Использует accentize_text.py (словари из папки DICTS) и функцию lookup_rings  из него же.
Использует схему ритма и размера из SCHEME.
Использует функцию separate_block для отделения подписи и рейтинга от порошка.
Использует функцию normalize_text для нормализации текста порошка.
Использует функцию analyze_rhythm для анализа ритма.
Использует функцию check_scheme для проверки ритма и размера по схеме.
"""

""" ??? дополнительно  
    Реализуйте функцию для ввода текста пользователем (например, через input или загрузку файла). 

    1 анализ одинаков ли ритм в строках, 
    2 если разный то гармонично ли сочетание ритмов?    см инет
        
    Как проставлять ударения в связке однослоговых слов?   + логические ударения (тактовое и фразовое)   + ритмическай инерция (подстройка под предыдущие строки)
    Однослоговые слова в строке на чётном месте назначаю ударными. ( но частицы, союзы ... обычно без ударения )    см вода в тексте  инет  

"""

#    РИФМЫ   (см rhyme.ipynb и rhyme.py)

""" -?      Альтернатива: Словарь рифм
https://wikilivres.ru/%D0%A1%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C_%D1%80%D0%B8%D1%84%D0%BC 
invers.txt 
Можно использовать готовые словари или базы данных рифм. Например, rifme.net или rifmus.net — они дают рифмы по звучанию, ударению и даже тематике.
Можно написать скрипт, который будет обращаться к одному из таких сайтов и вытаскивать рифмы. Можно натренировать свою собственную модель рифм на корпусе стихов.

"""


VOWELS = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"  # гласные буквы
# схема по слогам и ударениям 
SCHEME = ["-+-+-+-+-", "-+-+-+-+","-+-+-+-+-","-+"]

ALLOWED_CHARS = "+"   # разрешённые символы (можно добавить например "-*/^%")
pattern_letters = rf"[^\w\s{re.escape(ALLOWED_CHARS)}]+|_"     # всё кроме букв, цифр, пробелов и разрешённых символов
# компилируем регулярку, чтобы ускорить поиск 
regex_let = re.compile(pattern_letters, flags=re.UNICODE) 
# компилируем регулярку для удаления групп чисел и групп латинских букв
regex_cyr = re.compile(r"\d+|[a-zA-Z]+", flags=re.UNICODE) 
pattern_chars = rf"[{re.escape(ALLOWED_CHARS)}]+"     # не забываем в конце удалить рабочие символы
regex_chars = re.compile(pattern_chars, flags=re.UNICODE) 


# разбиваем блок на надпись (источник и дата); ПОРОШОК; автор, рейтинг; (всё без отступов)
def separate_block(text: str, scheme: list=SCHEME) -> dict:
    scheme = list(scheme)  # локальная копия, чтобы не трогать глобальный SCHEME

    sign_markers = ["©", "(C)", "(c)", "(С)", "(с)"]

    # 1. Чистим пробелы и пустые строки
    cleaned_lines = [line.strip() for line in text.splitlines() if line.strip()]

    # 2. Ищем строку с маркером
    marker_index = None
    marker_used = None
    for i, line in enumerate(cleaned_lines):
        for marker in sign_markers:
            if marker in line:
                marker_index = i
                marker_used = marker
                break
        if marker_index is not None:
            break

    if marker_index is not None:
        top_lines = cleaned_lines[:marker_index]
        bottom_line = cleaned_lines[marker_index].replace(
            marker_used, "").strip()
    else:
        top_lines = cleaned_lines
        bottom_line = ""

    # 3. Извлекаем автора и рейтинг
    rating = ""
    avtor = ""
    if bottom_line:
        bottom_list = bottom_line.split()
        if bottom_list and bottom_list[-1].isnumeric():
            rating = bottom_list[-1]
            avtor = " ".join(bottom_list[:-1]) if len(bottom_list) > 1 else ""
        else:
            avtor = " ".join(bottom_list)

    # 4. Достаём стих из верхней части
    poem_length = len(scheme)
    if len(top_lines) > poem_length:
        poem = top_lines[-poem_length:]
        top_info = top_lines[:-poem_length]
    else:
        poem = top_lines
        top_info = []

    # 5. Оставляем только "валидный хвост" в top_info (ищем дату снизу вверх)
    DATE_PATTERN = re.compile(r"\b\d{2}\.\d{2}\.\d{4}\b")
    if top_info:
        keep = []
        for line in reversed(top_info):
            if DATE_PATTERN.search(line):
                keep.append(line)
            else:
                break
        top_info = list(reversed(keep))

    report = {
        "top_info": top_info,          # список строк
        "poem": poem,                  # список строк
        "avtor": avtor,                # строка
        "rating": rating,              # строка
    }
    return report



# ======= анализ ритма =======
def analyze_rhythm(accented_text: list[str]) -> list[str]:
    """
    Получает список строк с ударениями (+ перед ударной гласной),
    возвращает схему -/+ по слогам.
    """
    if not accented_text: 
        return None
    
    def analyze_line(accented_line: str) -> str:    
        rhythm = []
        i = 0
        while i < len(accented_line):
            ch = accented_line[i]
            if ch in "+*^" and i + 1 < len(accented_line) and accented_line[i+1] in VOWELS:
                rhythm.append(ch)   # ударная гласная   или омограф (звёздочка)
                i += 1               # пропускаем саму гласную
            elif ch in VOWELS:
                rhythm.append("-")   # безударная гласная
            """elif ch == " ":
                rhythm.append(" ")   # ?? вариант с сохранением пробела между словами"""

            i += 1
        return "".join(rhythm)
    
    real_scheme = []
    for line in accented_text:
        real_scheme.append(analyze_line(line))

    return real_scheme 

# ======= проверка схемы =======
def check_scheme(real_scheme: list[str], scheme: list[str]=SCHEME) -> list[list[str]]:
    scheme = list(scheme)  # локальная копия, чтобы не трогать глобальный SCHEME
    log_lines = [] 
    log_syllables = []
    log_rythm = []
    
    # проверка по числу строк   
    diff = 0
    if len(real_scheme) != len(scheme):
        log_lines.append("<<< LINES_ERROR >>>")
        log_lines.append(f"{len(real_scheme)} lines, {len(scheme)} expected")
        diff = len(real_scheme) - len(scheme)  # разница в количестве строк
        
    # при несоответствии обрежем более длинную схему сверху, оставляем нижние строки 
    if diff < 0:  
        scheme = scheme[-len(real_scheme):]
    elif diff > 0:   # сейчас у меня не бывает diff > 0  т.к. изначально берётся по схеме (возможно пригодится при обобщении ?? )
        real_scheme = real_scheme[-len(scheme):]

    # проверка по слогам
    for i in range(len(scheme)):
        r,s = len(real_scheme[i]),len(scheme[i])
        if r != s:
            if not log_syllables: log_syllables.append("<<< SYLLABLES_ERROR >>>")
            log_syllables.append(f"{i+1} line: {r} syllables")

    # проверка по ударениям (с учётом омографов *^)
    for i in range(len(scheme)-1): # последняя строка не проверяется  ( ??? сделать mode по флагу ? )
        group_type = None 
        group_hits_plus = False 

        for j in range(min(len(real_scheme[i]), len(scheme[i]))): # при несоответствии сравниваем по более короткой из двух строк (чтобы не вылазить за индексы)
            r = real_scheme[i][j]
            s = scheme[i][j]

            if r == "+" and s == "-":
                if not log_rythm: 
                    log_rythm.append("<<< STRESS_ERROR >>>")
                log_rythm.append(f"{i+1} line, {j+1} pos")

            # Обработка группы
            if r in "*^":
                if group_type is None:
                    group_type = r
                    group_hits_plus = False
                elif group_type != r:
                    # Прерывание чужим типом
                    if not group_hits_plus:
                        if not log_rythm: 
                            log_rythm.append("<<< STRESS_ERROR >>>")
                        log_rythm.append(f"{i+1} line, BEFORE {j+1} pos")
                    group_type = r
                    group_hits_plus = False

                if s == "+":
                    group_hits_plus = True
                continue  # важно: не сбрасывать группу на своём же символе

            # Прерывание группы
            if r in "+*^":
                if group_type and not group_hits_plus:
                    if not log_rythm: 
                        log_rythm.append("<<< STRESS_ERROR >>>")
                    log_rythm.append(f"{i+1} line, BEFORE {j+1} pos")
                group_type = None
                group_hits_plus = False

        if group_type and not group_hits_plus:
            if not log_rythm: 
                log_rythm.append("<<< STRESS_ERROR >>>")
            log_rythm.append(f"{i+1} line, BEFORE {j+1} pos")

    return log_lines, log_syllables, log_rythm



# ======= ГЛАВНАЯ ФУНКЦИЯ =======
def analyze_poem(text: str, scheme: list=SCHEME) -> tuple:  
    scheme = list(scheme)  # локальная копия, чтобы не трогать глобальный SCHEME
    #   ВНУТРИ ДОП ИНФО (report) v   берём только текст
    meta_info = separate_block(text, scheme)
    poem = meta_info["poem"]     # СПИСОК СТРОК порошка как есть
    
    # нормализуем текст     
    norm_poem = normalize_text(poem)  


    # оставляем только буквы, цифры, пробелы и разрешённые символы (для ударений)
    # ???  не нужно ли отдельно препинаки?
    clean_let_poem, log_let = transform_lines_and_log(norm_poem, regex_let, lambda x: "")
    # if clean_let_poem:
    if log_let: log_let[0] = "<<< STRANGE_SYMBOLS >>>:" # конкретизируем сообщение

    # оставляем только кириллицу, пробелы и разрешённые символы (для ударений)
    clean_cyr_poem, log_cyr = transform_lines_and_log(clean_let_poem, regex_cyr, lambda x: "")  
    if log_cyr: log_cyr[0] = "<<< LATINS AND DIGITS >>>:"   # конкретизируем сообщение

    # ?? ЗДЕСЬ ПЛАНИРУЮ  ^^  lambda заменить на функцию делающую транслит на кириллицу (транслит, num2words ...)  


    
    #------------- расставляем ударения ---------------- 
    accented_poem, log_acc = accentize_text(clean_cyr_poem)  
    # слова без ударений (не бракуем, показываем)  
    if log_acc: print(log_acc, ("\n").join(poem), sep="\n", end="\n\n")  

    # ----- анализ ритма и размера ----- 
    real_scheme = analyze_rhythm(accented_poem)

    # ----- сравнение с шаблоном -----
    log_lines, log_syllables, log_rythm = check_scheme(real_scheme, scheme)


    # дополнительно - проверка на разрывы слов   и   кольцо
    broken_words = lookup_rings(accented_poem)  
    # показываем 
    if broken_words: print(broken_words, ("\n").join(poem), sep="\n", end="\n\n") 


    # ПРОВЕРКА РИФМЫ 



    # ПОДГОТОВКА К ВЫВОДУ
    ok = True
    log_final = [log_let, log_cyr, log_lines, log_syllables, log_rythm]  # ,log_acc исключаю пока
    if any(log_final): ok = False    # если есть хоть один лог - бракуем

    # убираем рабочие символы
    clean_cyr_poem, _ = transform_lines_and_log(clean_cyr_poem, regex_chars, lambda x: "")  

    # переводим в строки
    clean_cyr_poem_str = ("\n").join(clean_cyr_poem)
    accented_poem_str = ("\n").join(accented_poem)
    poem_str = ("\n").join(poem)


    return ok, clean_cyr_poem_str, accented_poem_str, poem_str, log_final, log_acc



# -----------------------------
# ТЕСТ
# -----------------------------
if __name__ == "__main__":
    text = """
мне семь мне смдесять трёхведёрный
всё двадцать три все тридцать пять
тест+овый белок агу алкан 
понять
© bu
    """

    res = analyze_poem(text)
    print(res[0])
    print(res[1])
    print(res[2])
    print(res[3])
    print(res[4])
    print(res[5])
    #print(analyze_poem(text, f_norm=False))
