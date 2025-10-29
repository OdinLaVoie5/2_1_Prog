# rhyme.py  для  analyze_poem        ПРОВЕРКА РИФМ    
import re
from clean import clean_cyr_word


VOWELS     = "аэоуяеёюиыАЭОУЯЕЁЮИЫ" 
CONSONANTS = "бвгджзйклмнпрстфхцчшщьъБВГДЖЗЙКЛМНПРСТФХЦЧШЩЬЪ"   # добавил ь, ъ для remove_doubles_cons (после карты могут дублироваться)

#################### ПАРАМЕТРЫ ПРОГРАММЫ ###########################
####################################################################  
#     стихи отмеченные * (на месте первой буквы) ПРОПУСКАЕМ БЕЗ ПРОВЕРКИ РИФМЫ

MODE=1  # ВЫБОР СТРОГОСТИ (чёткости) РИФМ    2 строгая, 1 УПРОЩЁННАЯ, 0 детская

DEEP=4  # ВЫБОР ГЛУБИНЫ РИФМ  0 - СВЕРХЛЁГКИЙ (ударный слог без первой согласной),  1 - лёгкий (ударный слог), 2 - средний (с гласной в предударном слоге),   иначе (н/р 3) - тяжелый (с предударным слогом)
    # дб v   сделано вар    deep - вместо числа сделать вектор н/р (1, 4, 3) - число для каждого слога -
    # -  0 - не брать слог,  1 - брать только гласную, 2 - брать только согласные, 3 - слог без первой согласной, 4 - весь слог
#################################################################### 



"""  ?       КАРТА I (общая, обязательная) 
    Различаются (ударные) производные гласные ("ая" "эе" "оё" "ую"   "ыи") 
    ь, й  перед согласными и в конце строки сохраняются 
    Значит - различаются твёрдые и мягкие звуки  ? 
"""
MAP_1 = { 

    "ъ": " ",             # удаляем твёрдый ъ  

#### до ОБЪЕДИНЕНИЯ 
    # в начале, в конце и на стыке слов 
    " чт": " шт",                     # чтобы  (НЕ почта)
    "его ": "ево ",  "огого ": "огогъ ", "ого ": "ово ", "огогъ ": "огого ",  # своего    самого       ОШИБКА огого 
    "ться ": "ца ",  "тся ": "ца ",    # гнаться   гонятся 
    "с и": "сы",    "з и": "зы",      # с иглой   раз игла  (НЕ синий зина)

    "сегодня": "севодня",

    "жё": "жо",         # жёлтый (НЕ  ты ж ёж)    


#----    оглушение согласных
    "б": "п", "в": "ф", "д": "т",     # зс(ц) гкх? жшщ(ч) 
    "з": "с", "г": "к",  "ж": "ш",     "х": "к",  # ?  х-к убрать в карту 1?  

    "м": "н",     # ?    сон сом   наш маш   


    "фстф": "стф",     # чувств графств (НЕ граф с твоим)

    "це": "цэ",   # прицел  (НЕ блиц есть)
        "исчо": "иcчъ", 
    "сч": "щ",    # счастье  (НЕ с частью)
        "иcчъ": "исчо",  # орфоюмор

    "лнц": "нц", "стн": "сн",     # солнце  ( ? НЕ волн цен)   страстно ( ? НЕ рост ног)


####    УДАЛЯЕМ ПРОБЕЛЫ  ОБЪЕДИНЕНИЕ
    " ": "",    

         
# ж,ш, ц ?  всегда твёрдые     # щ,  ч  всегда мягкие
    "шь": "ш", "ць": "ц",         # ешь    гаць ?
    "ши": "шы",  "ци": "цы",      # куш игла   души       блиц игра   цигун 
    "щь": "щ", "щ": "щь",  "чь": "ч", "ч": "чь",         # вещь борщ   мочь туч     "чь": "ч", "ч": "чь" чтобы у всех ч/щ был один ь   


    "тс": "ц", "тьс": "ц", "тц": "ц", "тьц": "ц", "цс": "ц",        # т.к. ц=тс   ватсон советский      корытце    ?    спецставка
    "тч": "ч",               # китч   тут часть ?


# ь + гласные
    "ья": "я", "ье": "е", "ьё": "ё", "ью": "ю", "ьи": "и", "ьы": "ы",
    "ьа": "я", "ьэ": "е", "ьо": "ё", "ьу": "ю",   

# й + гласные
    "йя": "я", "йе": "е", "йё": "ё", "йю": "ю", "йи": "и", "йы": "ы",
    "йа": "я", "йэ": "е", "йо": "ё", "йу": "ю",

} 


"""           КАРТА II (упрощенние)
Определить другие замены, выпадания ...     ?     
Определить другие родственные буквы     ?   
"""
MAP_2   = {    
# к базовым гласным
"я": "а", "э": "е", "ё": "о", "ю": "у", "ы": "и",   #  беру базовой е, может правильней э?  "е": "э",  ?
"р": "л",
"ь": "", "й": "",     #   пень пен   кий ки 

}


MAP_3   = {         # для безударных
"е": "и", "о": "а",         #  песец    коров 
"ц": "с",   "ш": "щ", "ч": "щ",     # цари сори    щенок краше ног    чарка шар ка         
}

MAP_4   = {        # для безударных  СОМНИТЕЛЬНОЕ 
"с": "ш",    # от логопедов  и  иностранцев  р-г р-а р-"" ?   х-"" ?   л-в (ло лу лы ?)               
"м": "л",  "п": "ф"      # п-ф(б-в)    т-с ф-с   п-т 
}


# мой фономизатор по моему словарю REPLACES (последовательное применение карт замен)    
def apply_maps_seq(s, maps):
    for m in maps:
        for a, b in m.items():
            s = s.replace(a, b)
    return s

MAP_COMMON =  (MAP_1,) if MODE == 2 else (MAP_1, MAP_2) if MODE == 1 else (MAP_1, MAP_2, MAP_3)   # для ударных.  2 строгая, 1 упрощённая, 0 детская  
MAP_NO_ACC = (MAP_1, MAP_2, MAP_3, MAP_4) if MODE == 0 else (MAP_1, MAP_2, MAP_3)  # для безударных.


# убираем двойные согласные
def remove_doubles_cons(text: str) -> str:
    return re.sub(rf"([{CONSONANTS}])\1+", r"\1", text, flags=re.IGNORECASE)



# разбиваем строку на блоки (условные слоги)  возвращает список (phon_list)
def split_for_rhyme(line: str) -> list[str]:
    result = []
    current = []
    i = len(line) - 1

    while i >= 0:
        ch = line[i]
        current.append(ch)

        if ch in VOWELS:
            if i - 1 >= 0 and line[i - 1] not in VOWELS:
                current.append(line[i - 1])
                i -= 1
            # добавляем блок как строку (перевёрнутый, т.к. шли с конца)
            result.append("".join(reversed(current)))
            current = []
        i -= 1

    if current:
        result.append("".join(reversed(current)))

    result.reverse()
    return result



# возвращает словарь с ещё не проверенными рифмами
def extract_rhyme_tail(phon_list: list[list], scheme: tuple, rhymes: str):
    rhymes_dict = {}
    min_len = min(len(phon_list), len(rhymes))

    for i in range(min_len):
        ch = rhymes[i]
        if ch=="_": continue     # если в шаблоне РИФМ знак "_" - не проверяем
        if (not scheme[i]) or ("+" not in scheme[i]):   # если нет строки шаблона   или  в ней нет "+"
            tail = phon_list[i][-1:]                    # - берём последний слог по умолчанию
        else:
            idx = scheme[i].rfind("+")
            p = len(scheme[i]) - idx        # позиция ударного (1 — последний слог)
            line_phon = phon_list[i]
            n = len(line_phon)

            # безопасные индексы
            add  = line_phon[-p-1] if n > p     else ""
            acc  = line_phon[-p]  if n >= p    else ""                
            past = line_phon[-p+1:] if p > 1    else [""]
            tail = [add, acc, *past]    
            # print(tail)

        rhymes_dict.setdefault(ch, []).append(tail)

    return rhymes_dict


#               ФУНКЦИЯ СВЕРКИ 2-х рифм      
#  ?  возможен вариант сравнения не     все с первой строкой     а цепочкой    (есть ли отличия?)
def two_rhymes_fn(a_tail, b_tail, deep) -> bool:
    #  сделано вар     deep - вместо числа сделать вектор н/р (1, 4, 3) - число для каждого слога -
    # -  0 - не брать слог,  1 - брать только гласную, 2 - брать только согласные, 3 - слог без первой согласной, 4 - весь слог 
    
    ln = min(len(a_tail), len(b_tail))  # странный случай (теоритически может быть) - если в схеме хвост B длиннее хвоста A  лишок обрезаем  или браковать ?

    rez_a, rez_b = "", ""
    for i in range(ln):
        a, b = a_tail[i], b_tail[i]
        if i == 0: 
            if (not a or not b): continue   # нет предударного слога  пропускаем чо уж
            if deep <= 1: continue       # лёгкий режим пропускаем предударный слог  
            elif deep==2: 
                a = next((ch for ch in a if ch in VOWELS), "") # в предударном слоге берём только гласную 
                b = next((ch for ch in b if ch in VOWELS), "")
            # иначе остаётся полный предударный слог

        if i == 0 or i >= 2:   # вар   разделить i == 0, i = 2 и управлять отдельно?    для первого слога  и  послеударного хвоста  упрощённая карта  
            # print(a, b)
            a = remove_doubles_cons(apply_maps_seq(a, MAP_NO_ACC))  # повторно remove_doubles_cons   ?   
            b = remove_doubles_cons(apply_maps_seq(b, MAP_NO_ACC))  
            # print(a, b)
        else:             # i==1              вар   V
            # обрезаем ударные слоги (если ОБА не короткие и начинаются на согласную)
            if deep == 0 and all((a, b)) and a[-1] not in VOWELS and b[-1] not in VOWELS:
                if (len(a) > 2) and (a[0] not in VOWELS): a  = a[1:]
                if (len(b) > 2) and (b[0] not in VOWELS): b  = b[1:]

        rez_a, rez_b = rez_a + a, rez_b + b

    len_a, len_b = len(rez_a), len(rez_b)   #  вар   ^
    if MODE <= 1: # нестрогая рифмовка  без последней буквы  ((козак глаза   а в семь совсем))
        if len_a != len_b  and  max(len_a, len_b) >= 3:   # ?  какую длину? 3? 4?
            if len_a > len_b and rez_a[-1] not in VOWELS:
                rez_a = rez_a[:-1]
            elif len_b > len_a and rez_b[-1] not in VOWELS:
                rez_b = rez_b[:-1]

    if rez_a != rez_b:
        return False, (rez_a, rez_b)

    return True, (rez_a, rez_b)

#              ГЛАВНАЯ ФУНКЦИЯ  проверка рифм
def check_rhymes(lines, scheme=None, rhymes=None, deep=None):
    log_norhyme = []
    log_rhyme = []        

    if not lines: 
        log_norhyme.append("NO TEXT")
        return log_norhyme, log_rhyme

    if isinstance(lines, str):
        lines = lines.splitlines() # если текст, то делаем список строк

    if lines[0] and lines[0][0]=="*":     # отмеченные * пропускаем без проверки РИФМЫ
        return log_norhyme, log_rhyme 

    if rhymes is None: rhymes = "abab"  # рифмовка по умолчанию
    if scheme is None: scheme = "+" * len(rhymes)  # схема по умолчанию последние слоги
    if deep is None: deep = DEEP  # режим по умолчанию (установлено в глобале)

    phon_list = [split_for_rhyme(remove_doubles_cons(apply_maps_seq(clean_cyr_word(remove_doubles_cons(line.lower()) + " ", allowed_chars="", add=" "), MAP_COMMON))) for line in lines]
    # print(phon_list)     # отладка
    rhymes_dict = extract_rhyme_tail(phon_list, scheme, rhymes)
    print(rhymes_dict)     # отладка

    """  ?
    Проверяет rhymes_dict.
    - пропускает группы с < 2 элементов
    - если base (первый tail) пустой -> логируем (бракуем) эту группу
    - для каждой оставшейся пары сравниваем tail с base, при несовпадении логируем
    Возвращает список сообщений log_norhyme.
    """

    for group, tails in rhymes_dict.items():
        # пропускаем одиночные группы    ?  доделать   если в схеме не указана одиночка - то надо браеовать  
        if len(tails) < 2:
            log_rhyme.append(f"Группа '{group}': одиночная группа")
            continue

        base = tails[0]

        # если опорный хвост пустой — считаем группу дефектной и логируем
        if not base:
            log_norhyme.append(f"Группа '{group}': опорный хвост пуст (base пуст) — бракуем группу")
            continue

        # сравниваем остальные хвосты с опорным
        for idx, tail in enumerate(tails[1:], start=2):
            ok, info = two_rhymes_fn(base, tail, deep)

            if not tail:
                log_norhyme.append(f"Группа '{group}': элемент #{idx} — нет ударения/хвоста")
            
            if not ok:
                log_norhyme.append(
                    f"Группа '{group}': элемент #{idx} — не рифмуется ({info})"
                )
            else:
                log_rhyme.append(
                    f"Группа '{group}': элемент #{idx} — рифмуется  ({info})"
                )

    return log_norhyme, log_rhyme





# ?  если в хвосте есть "ь", то он должен быть в обоих хвостах  в одной и той же группе согласных ? 
#      
#  ль - й  (боль - бой) ?     

"""            ДОПОЛНИТЕЛЬНО
если группа одинаковых букв (3?)        - брак по звуку
если группа из согласных (4?)           - брак по звуку      но: "пространство"  
"""





if __name__ == "__main__": 
    poem = """не важно родина какая 
	моя сиам или чешир 
	пришёл к тебе меня за ушком 
	чеши ррр
"""

    l1, l2 = check_rhymes(poem, ("+-","+","+-","+") , rhymes="abab")       # 
    print(l1)
    print(l2)
    #  

