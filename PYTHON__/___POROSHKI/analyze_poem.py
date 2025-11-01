# analyze_poem  для  gpt_poroshki (или самостоятельно)      ЦЕНТРАЛЬНЫЙ БЛОК        АНАЛИЗ 
 
import re 
from config import VOWELS, ALLOWED_CHARS 
from accentize_text import accentize_text, lookup_rings
from clean import clean_lines_with_log
from rhyme import check_rhymes

""" Здесь у меня для определения размера поэтического текста используется упрощённая схема (отсутствие ударения на "-" в схеме)
для трёхсложных размеров (дактиль, амфибрахий, анапест) это не совсем корректно.  
            чужое 
'Для автоматического определения метрической структуры поэтического текста строится числовой вектор по следующему принципу: 
символом 1 обозначаются безударные слоги, 2 ударные слоги односложных слов, 3 первую позицию в двусложном слове, 
4 слоги, занимающие вторую позицию в двусложном слове, 5 ударные слоги слов, которые длиннее двух слогов. 
Полученный вектор анализируется по следующим правилам:

ЯМБ -  На нечётных позициях только символы 1 или 2.
ХОРЕЙ -  На чётных позициях только символы 1 или 2.
ДАКТИЛЬ - На позициях номер 2, 5, 8 ... только символы 1, 2 или 3, на позициях номер 3, 6, 9 ... только символы 1, 2 или 4.
АМФИБРАХИЙ - На позициях номер 1, 4, 7 ... только символы 1, 2 или 4, на позициях номер 3, 6, 9 ... только символы 1, 2 или 3.
АНАПЕСТ - На позициях номер 1, 4, 7 ... только символы 1, 2 или 3, на позициях номер 2, 5, 8 ... только символы 1, 2 или 4.
? остальные - дольник. '
"""

"""  ??? поправить описание ...     АНАЛИЗ ПОРОШКА ПО РИТМУ И РАЗМЕРУ
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

""" -?      Альтернатива: Словарь рифм
https://wikilivres.ru/%D0%A1%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C_%D1%80%D0%B8%D1%84%D0%BC 
invers.txt 
Можно использовать готовые словари или базы данных рифм. Например, rifme.net или rifmus.net — они дают рифмы по звучанию, ударению и даже тематике.
Можно написать скрипт, который будет обращаться к одному из таких сайтов и вытаскивать рифмы. Можно натренировать свою собственную модель рифм на корпусе стихов.
"""


     # схема по слогам и ударениям 
SCHEME = ("-+-+-+-+-","-+-+-+-+","-+-+-+-+-","_+")  # знак "_" отмечает строку, которую не надо проверять на ударение
     # схема по рифмам
RHYMES = "_b_b"           #abab знак "_" отмечает строку, которую не надо проверять на рифму
# ???   сделать проверку равенства длин SCHEME и RHYMES   ? и обрезать лишнее (с предупреждением)


""" ?  ALLOWED_CHARS разрешённые символы устанавливаются В clean.py и импортируются сюда. 
пытался наоборот, но не получилось 
МОЖНО вынести общее в третий модуль (common.py или constants.py или config.py)  ?? 
ПО СУТИ НУЖНО ТОЛЬКО  +
"""


# разбиваем блок на надпись (источник и дата); ПОРОШОК; автор, рейтинг; (всё без отступов)
def separate_block(text: str, scheme: tuple[str]=SCHEME) -> dict:

    sign_markers = ["©", "(C)", "(c)", "(С)", "(с)"]

    # 1. Чистим пустые строки (табы и пробелы оставляем как они есть)
    cleaned_lines = [line for line in text.splitlines() if line.strip()]

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
    else:                 # если нет маркера в тексте - значит без подписи
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

    if not poem:
        poem = [""]

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
                rhythm.append(" ")   # ?? вариант с сохранением пробела между словами  (ещё возможно препинаки)"""

            i += 1
        return "".join(rhythm)
    
    real_scheme = []
    for line in accented_text:
        real_scheme.append(analyze_line(line))

    return real_scheme 

# ======= проверка схемы =======
def check_scheme(real_scheme: list[str], scheme: tuple[str]=SCHEME) -> list[list[str]]:
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
    for i in range(len(scheme)): # последняя строка не проверяется 
        if scheme[i][0] == "_": continue # отмеченную в шаблоне строку не проверяем

        group_type = None 
        group_hits_plus = False 

        for j in range(min(len(real_scheme[i]), len(scheme[i]))): # при несоответствии сравниваем по более короткой из двух строк (чтобы не вылазить за индексы)
            r = real_scheme[i][j]
            s = scheme[i][j]

            if r == "+" and s == "-":
                if not log_rythm: 
                    log_rythm.append("<<< STRESS_ERROR >>>")
                log_rythm.append(f"{i+1} line, {j+1} syllable")

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
                        log_rythm.append(f"{i+1} line, BEFORE {j+1} syllable")
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
            log_rythm.append(f"{i+1} line, BEFORE {j+1} syllable")

    return [log_lines, log_syllables, log_rythm] 



#          ГЛАВНАЯ ФУНКЦИЯ
def analyze_poem(text: str, scheme: tuple[str]=SCHEME) -> tuple:  
    #   ВНУТРИ ДОП ИНФО (report) v   берём только текст
    meta_info = separate_block(text, scheme)
    poem = meta_info["poem"]     # СПИСОК СТРОК порошка как есть


    # в данном случае handle_token (перед clean_lines_with_log) настраиваем на то, чтобы 
    # оставить только БУКВЫ (с - и ' в словах), ЦИФРЫ, ПРОБЕЛЫ и разрешённые символы (ALLOWED_CHARS) (для ударений)
    clean_poem, log_symbols = clean_lines_with_log(poem)


    # ??? ЗДЕСЬ ПЛАНИРУЮ  ^^  lambda заменить на функцию делающую транслит на кириллицу (транслит, num2words ...)  


    
    #------------- расставляем ударения  ( ?? может вынести в отдельный файл? (как check_rhymes вынесен) ) ---------------- 
    accented_poem, log_acc = accentize_text(clean_poem)  
    # слова без ударений (не бракуем, показываем)  
    if log_acc: print(log_acc, ("\n").join(poem), sep="\n", end="\n\n")  

    # ----- анализ ритма и размера ----- 
    real_scheme = analyze_rhythm(accented_poem)

    # ----- сравнение с шаблоном -----
    log_errors = check_scheme(real_scheme, scheme)

    # дополнительно - проверка на разрывы слов   и   кольцо
    broken_words = lookup_rings(clean_poem)  
    # показываем 
    if broken_words: print(broken_words, ("\n").join(poem), sep="\n", end="\n\n") 

    # доп   убираем из списка неизвестных слов (log_acc)  разрывы слов (анжамбеман) (части broken_words) 
    log_acc = [w for w in log_acc if not any(w in x for x in broken_words)]
        


    # ПРОВЕРКА РИФМЫ      
    info_rhymes = check_rhymes(clean_poem, RHYMES, SCHEME)
    log_norhyme, log_rhyme = info_rhymes[0], info_rhymes[1]
    #print(log_norhyme)
    #print(log_rhyme) 


    # ПОДГОТОВКА К ВЫВОДУ
    ok = True
    #  формат log_norhyme отличается от остальных  ?? поправить
    log_final = log_symbols + log_errors + [log_norhyme]    # ,log_acc исключаю пока
    log_final = [x for x in log_final if x]   # убираю пустые
    if any(log_final): ok = False      # если есть хоть один лог - бракуем


    # переводим в строки
    clean_poem_str = ("\n").join(clean_poem)
    for ch in ALLOWED_CHARS:   
        clean_poem_str = clean_poem_str.replace(ch, "") #   убираем ALLOWED_CHARS 

    accented_poem_str = ("\n").join(accented_poem)
    poem_str = ("\n").join(poem)


    return ok, clean_poem_str, accented_poem_str, poem_str, log_final, log_acc



# -----------------------------
# ТЕСТ
# -----------------------------
if __name__ == "__main__":
    text = """
	в ДОМ вхо`дят будущего люди
	у каж-дого  ружьё и шт+ык
	и в на`шиИиИИИ мел*кие проблемы  
иж каг 

    """

    res = analyze_poem(text)
    print(res[0])
    print(res[1])
    print(res[2])
    print(res[3])
    print(res[4])
    print(res[5])
    #print(analyze_poem(text, f_norm=False))
