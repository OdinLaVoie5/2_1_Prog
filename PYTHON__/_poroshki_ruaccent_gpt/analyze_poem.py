# analyze_poem.py
import re
from linebreaks_restore import linebreaks_restore
from accentize_text import accentize_text
from lookup_rings import lookup_rings

"""       используется в gpt_poroshki.py     """
"""    ПРОВЕРКА ПОРОШКА  РИТМ и РАЗМЕР  
    ???    ПРОБЛЕМЫ  
    1+   ruaccent иногда меняет е на ё  - отключил ёфикацию
    2 ruaccent  несуществующие слова обрабатывает не так как мне нужно 
    застря -> з+астр+я (два ударения в довольно коротком слове)   
    овавая -> овавая (не проставил ударения)
        ОТКЛЮЧИТЬ  nn ?
    3 ударение в словах с несколькими ё    ОБЫЧНО НА ВТОРОЕ ё.   трёхведЁрное  (трёхвЁдерное) ...     (но сЁдзё - СДЕЛАТЬ СПИСОК ИСКЛЮЧЕНИЙ)    ТёЁлё ?? район в Хельсинки 
    4 если слово допускает несколько вариантов (ОМОГРАФЫ) — выбираем чётное 
        НЕ ОТКЛЮЧАТЬ  nn ?

    5 Реализуйте функцию для ввода текста пользователем (например, через input или загрузку файла). 


    ??    ДОПОЛНИТЕЛЬНО
    1 анализ одинаков ли ритм в строках, 
    2 если разный то гармонично ли сочетание ритмов?
        
    Как проставлять ударения в связке однослоговых слов?   + логические ударения (тактовое и фразовое)   + ритмической инерции (подстройка под предыдущие строки)
    Однослоговые слова в строке на чётном месте назначаю ударными. ( но частицы, союзы ... обычно без ударения )

"""
"""    РИФМЫ   (см rhythm.ipynb)
простейшая проверка  (совпадение 2-х последних букв в последних словах строк)
def rhyme(a, b):
    a = a.strip().split()[-1]
    b = b.strip().split()[-1]
    return a[-2:] == b[-2:]

Вариант 1: Сравнение по последнему слогу
Это чуть точнее, чем просто две буквы:
import re

def get_last_syllable(word):
    vowels = "аеёиоуыэюя"
    parts = re.findall(r'[бвгджзйклмнпрстфхцчшщ]*[аеёиоуыэюя]+', word.lower())
    return parts[-1] if parts else word

def rhyme(a, b):
    a_last = get_last_syllable(a.strip().split()[-1])
    b_last = get_last_syllable(b.strip().split()[-1])
    return a_last == b_last

Пример:
rhyme("давай", "трамвай") → True
rhyme("молоко", "окно") → False

Вариант 2: Использование фонетики (через внешние библиотеки)
Если ты работаешь с английским, можно использовать pronouncing — она опирается на фонетический словарь CMU:
import pronouncing

def rhyme_en(a, b):
    a_phones = pronouncing.phones_for_word(a.lower())
    b_phones = pronouncing.phones_for_word(b.lower())
    if not a_phones or not b_phones:
        return False
    return pronouncing.rhymes(a.lower()).count(b.lower()) > 0

Но для русского языка таких библиотек меньше. Можно попробовать использовать pymorphy2 для морфологии, но фонетика — это отдельная песня.

Альтернатива: Словарь рифм
Если ты хочешь точные рифмы, можно использовать готовые словари или базы данных рифм. Например, rifme.net или rifmus.net — они дают рифмы по звучанию, ударению и даже тематике.
Хочешь, я помогу тебе написать скрипт, который будет обращаться к одному из таких сайтов и вытаскивать рифмы? Или может быть, ты хочешь натренировать свою собственную модель рифм на корпусе стихов?


!!! ??? 
((
         1.   анализ рифмы 2 и 4 строк  по методу -
брать последнее слово строки, из него  брать кусок от последней гласной слова (включая её) и до конца слова. 
"оркестр" - "естр" (а лучше  "кестр".  захватывая прилегающую согласную)
если строка заканчивается на однобуквенное слово согласную, то нужно брать кусок от последней гласной ПРЕДПОСЛЕДНЕГО слова (включая её) и до конца слова                и присоединить к нему  однобуквенное слово согласную
"баран к" -  "анк"  (а лучше  "ранк")
"весна в" - "ав"  (а лучше  "нав",   ещё лучше "снав") 
  если строка заканчивается на однобуквенное слово гласную, то нужно брать последнюю букву ПРЕДПОСЛЕДНЕГО слова         и присоединить к нему  однобуквенное слово гласную   Если же последняя буква ПРЕДПОСЛЕДНЕГО слова не звучащая (ъ,ь,) или гласная, то берём ещё одну предыдущую букву
"дочек а" - "ка"    (а лучше  "ека",   ещё лучше "чека")  
   (примечание - изменить метод приравнивая схожие звуки а-о, и-е, е-ю, б-п, в-ф, г-к-х, д-т, ж-ш, з-с, л-н-м ... ) 
  2.  оценка ассонанса 
  если рифма по пункту 1 недостаточно хороша, то рассматриваем ассонанс.
посчитать число букв 4-й строки, взять столько же во 2-й. посчитать  расстояние Левенштейна и по нему оценивать  ассонанс
))
"""


VOWELS = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"  # гласные буквы
# схема по слогам и ударениям 
SCHEME = ["-+-+-+-+-", "-+-+-+-+","-+-+-+-+-","-+"]
# глобальная настройка режима проверки
CHECK_MODE = "easy"   # "supstrict" | "normal" | "easy"


# разбиваем блок на надпись (источник и дата); ПОРОШОК; автор, рейтинг; (всё без отступов)
def separate_block(text: str, scheme=SCHEME) -> dict:

    sign_markers = ["©", "(C)", "(c)", "(С)", "(с)"]

    # 1. Чистим пробелы и пустые строки
    cleaned_lines = [line.strip()
                     for line in text.splitlines() if line.strip()]

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

# нормализация текста
def normalize_text(text_lines: list[str], allowed_chars: str = "+") -> list[str]:
    """
    Нормализует список строк:
      1. Оставляет только буквы (любого языка), цифры, пробелы и
         и символы из allowed_chars. (можно добавить например "-*/^%")
      2. Убирает пустые строки, табы, пробелы по краям и лишние пробелы.
      3. Переводит всё в нижний регистр.
    """
    # Экранируем символы, чтобы регексп не сломался
    escaped_allowed = re.escape(allowed_chars)
    pattern = rf"[^\w\s{escaped_allowed}]|_"

    normalized = []
    for line in text_lines:
        # 1. Оставляем только разрешённые символы
        line = re.sub(pattern, "", line, flags=re.UNICODE)

        # 2. Чистим табы и лишние пробелы
        line = line.replace("\t", " ")
        line = " ".join(line.split())

        # 3. Приводим к нижнему регистру
        line = line.lower()

        # Убираем пустые строки
        if line:
            normalized.append(line)

    return normalized

# ======= анализ ритма =======
def analyze_rhythm(accented_text: str) -> list:
    """
    Получает текст с ударениями (ruaccent, + перед ударной гласной),
    возвращает схему -/+ по слогам.
    """
    def analyze_line(accented_line: str) -> str:    
        rhythm = []
        i = 0
        while i < len(accented_line):
            ch = accented_line[i]
            if ch == "+" and i + 1 < len(accented_line) and accented_line[i+1] in VOWELS:
                rhythm.append("+")   # ударная гласная
                i += 1               # пропускаем саму гласную
            elif ch in VOWELS:
                rhythm.append("-")   # безударная гласная
            """elif ch == " ":
                rhythm.append(" ")   # ?? вариант с сохранением пробела между словами"""

            i += 1
        return "".join(rhythm)
    
    accented_text_lines = accented_text.splitlines()
    real_scheme = []
    for line in accented_text_lines:
        real_scheme.append(analyze_line(line))
    return real_scheme 

# ======= проверка схемы =======
def check_scheme(text_poem, scheme, real_scheme, mode="easy"):  
    """
    Проверка схемы ударений.  
    mode: 
      - "supstrict": всё должно совпасть (и +, и -)
      - "normal": все минусы должны совпасть (разрешается несовпадение +)
      - "easy": тоже что normal плюс последняя строка игнорируется
    """
    if len(real_scheme) != len(scheme):
        print("LINES_ERROR", text_poem, scheme, real_scheme, "-" * 40, sep="\n")
        return False

    for i in range(len(scheme)):
        if len(real_scheme[i]) != len(scheme[i]):
            print("SYLLABLES_ERROR", text_poem, scheme, real_scheme, "-" * 40, sep="\n")
            return False

    for i in range(len(scheme)):
        for j in range(len(scheme[i])):
            if mode in ["normal","easy"]:
                if scheme[i][j] == "-" and real_scheme[i][j] == "+":
                    if (i == len(scheme) - 1) and (mode == "easy") :
                        print("avtor stile", text_poem, scheme, real_scheme, "-" * 40, sep="\n")
                    else:
                        print("STRESS_ERROR", text_poem, scheme, real_scheme, "-" * 40, sep="\n")
                        return False
            
            elif mode == "supstrict":
                if scheme[i][j] != real_scheme[i][j]:
                    print("STRESS_ERROR", text_poem, scheme, real_scheme, "-" * 40, sep="\n")
                    return False

    return True



# ======= ГЛАВНАЯ ФУНКЦИЯ =======

def analyze_poem(text: str) -> tuple[str, str]:  
    #   ВНУТРИ ДОП ИНФО (report) v   берём только текст
    meta_info = separate_block(text)
    poem = meta_info["poem"]  # список строк
    
    # нормализуем текст     И УСЕЧЕНИЕ 1 
    norm_poem = normalize_text(poem, "+")   # оставляем только буквы, цифры, пробелы и "+" (для ударений)(можно др. символы, если нужно. просто дописать к "+")

    # объединяем строки обратно в текст с переносами строк
    text_poem = "\n".join(norm_poem)


    #     ??? ЗДЕСЬ ПЛАНИРУЮ  VV
    # if f_translit if f_numlit  False   для других процессоров (транслит, num2words ...)  добавить отдельные предварительные linebreaks_restore  по флагу?  Там имеет смысл репорт. 


    # УСЕЧЕНИЕ 2   если  text_poem содержит цифры или буквы не кириллицы   return None 
    # (остаётся только кириллица и пробелы)
    if re.search(r'[0-9]', text_poem) or re.search(r'[^\sа-яА-ЯёЁ]', text_poem):
        print("SYMBOLS_ERROR", text_poem)
        return None
 

    #------------- РАССТАВЛЯЕМ УДАРЕНИЯ ---------------- 
    # ВЕСЬ ТЕКСТ СРАЗУ, С ВОЗВРАТОМ ПЕРЕНОСОВ СТРОК.  ФУНКЦИЯ ИЗ МОДУЛЯ linebreaks
    
    # принимает текст и процессор (или список процессоров,  или [процессор, арг1, арг2, ...])
    # последнее нужно для accentize_text, {accentizer, словарь, флаги}) (или не нужен)   

    # ВНУТРИ ДОП ИНФО (big_info ) v     берём только текст и ...
    big_info = linebreaks_restore(text_poem, accentize_text) 
    accented_poem = big_info["restored"] 


    # ----- АНАЛИЗ РИТМА И РАЗМЕРА ----- 
    real_scheme = analyze_rhythm(accented_poem)

    # ----- СРАВНЕНИЕ С ШАБЛОНОМ -----
    if not check_scheme(text_poem, SCHEME, real_scheme):
        return None  

    # дополнительно - проверка на разрывы слов   и   кольцо
    broken_words = lookup_rings(text_poem)  # проверка на разрывы и кольца
    if broken_words:
        print("РАЗРЫВЫ И КОЛЬЦА", broken_words, text_poem,"-"*40, sep="\n")





    return text_poem   # real_scheme, accented_poem



# -----------------------------
# ТЕСТ
# -----------------------------
if __name__ == "__main__":
    text = """на слете юных и прекрасных 
на сползе старых и больных 
на съезде тех же но в колясках 
триптих"""
    
    """ТЕСТОВЫЙ ТЕКСТ           всякая фигня
    левый заголовок
    Порошки(25.04.2015)
    пироSHOK(27.04.2015)

    солнце всё поймёт!   б+езрукий  +кричит(кривое ударение и скобки)   |||  трёхцветный трёхколёсный трёхмерный (?? БЕЗУДАРНОЕ Ё трёх-)    четырёхкамерный   
    вертолётостроение      Кёнигсберг  сёрфингиста    Ёжик  ёлка  ёж   ЁЖИКИ  ё  
    МАШИНКИ     КНИЖКИ АРБ+АЛЕТ      принц в   замок   ??   ПРИВЕСТИ ПРОБЛЕМНЫЕ СЛУЧАИ
    паслён в пакет. на этом все.  побежали по лесу.

    © Kapus 435"""

    """ТЕСТ НОРМАЛИЗОВАННЫЙ/НЕНОРМАЛИЗОВАННЫЙ  result = separate_block(text, SCHEME)
    print(result["top_info"])
    print(result["poem"])
    print(result["avtor"])
    print(result["rating"])

    result1 = result["poem"]
    result2 = normalize_text(result1)
    result3 = accentize_text(result2)

    print(result2)
    print(result3)"""

    res = analyze_poem(text)
    print(res)
    # print(res[2])
    #print(analyze_poem(text, f_norm=False))
