# rhyme.py  для  analyze_poem        ПРОВЕРКА РИФМ
# последний вариант совместимый с analyze_poem

import re
from clean import clean_cyr_word
from config import * 


#########################    ПАРАМЕТРЫ    ##########################
####################################################################
#    стихи отмеченные * (на месте первой буквы) ПРОПУСКАЕМ БЕЗ ПРОВЕРКИ РИФМЫ

MODE=1  # ВЫБОР СТРОГОСТИ (чёткости) РИФМ    2 строгая, 1 УПРОЩЁННАЯ, 0 детская

DEEP=2  # [2,2,2] [0,3,4] ВЫБОР ГЛУБИНЫ РИФМ для каждого слога (предударный, ударный, послеударные)  (может быть списком чисел или числом)
# 0 - не брать слог,  1 - брать только гласную, 2 - брать только согласные,   3 - слог без первой согласной, 4 - весь слог
        # Сокращённая передача основных DEEP (одним числом) 
DEEP_PRESETS = {
    0: [1, 1, 1],  # ассонанс
    1: [2, 2, 2],  # консонанс
    2: [0, 3, 4],  # СВЕРХЛЁГКИЙ — без первой согласной в ударном
    3: [0, 4, 4],  # лёгкий — просто ударный
    4: [1, 4, 4],  # средний — с гласной в предударном
    5: [3, 4, 4],  # тяжёлый — предударный тоже без первой согласной
    6: [4, 4, 4],  # максимальная глубина — весь блок
}
####################################################################

# см phy_EXPE.py      там дабавлена trim_last_cons    и перебор всех векторов   и подсчёт очков рифмы
#  см config.py     там КАРТЫ И НАЗНАЧЕНИЯ ДЛЯ КАРТ 


# выбор комплекта карт в зависимости от ударного слога и MODE
def maps_for_syllable(index, mode):
    """
    index: 0=предударный, 1=ударный, >=2=послеударные
    mode:  уровень "жёсткости" карт (0 = easy, 1 = medium, 2 = strict)
    возвращает кортеж карт, которые применяем ПОСЛЕ PRE_MAPS (MAP_1 уже применён)
    """
    preset = MODE_PRESETS.get(mode, MODE_PRESETS[1])
    return preset[1] if index == 1 else preset["else"]


# механизм применения карт (циклично последовательно) (рассматривались другие варианты - побуквенная замена, применение комплекта карт одновременно, а не последовательно, и т.д.)
def apply_maps_seq(s, maps):
    for m in maps:
        for a, b in m.items():
            s = s.replace(a, b)
    return s


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
def extract_rhyme_tail(phon_list: list[list[str]], scheme, rhymes: str):
    """
    Возвращает dict: ключ = буква метки рифмы, значение = список tail'ов.
    Для отсутствующих строк (если текст короче схемы) добавляется placeholder [""].
    """
    rhymes_dict = {}
    if not rhymes:
        return rhymes_dict

    # проходим по всем позициям схемы рифмовки, даже если phon_list короче
    for i in range(len(rhymes)):
        ch = rhymes[i]
        if ch == "_":
            # в шаблоне _ означает игнорирование позиции — не добавляем ничего
            continue

        # безопасно получить scheme[i] (может быть None или короче)
        scheme_i = scheme[i] if scheme and i < len(scheme) else None

        # если у нас нет соответствующей строки текста — кладём placeholder
        if i >= len(phon_list):
            rhymes_dict.setdefault(ch, []).append(None)
            continue

        # есть строка — извлекаем хвост в зависимости от схемы
        line_phon = phon_list[i] or []
        if not scheme_i or ("+" not in scheme_i):
            # берём последний слог по умолчанию (или [""] если строка пуста)
            tail = line_phon[-1:] if line_phon else [""]
        else:
            idx = scheme_i.rfind("+")
            p = len(scheme_i) - idx        # позиция ударного (1 — последний слог)
            n = len(line_phon)

            add  = line_phon[-p-1] if n > p else ""
            acc  = line_phon[-p]   if n >= p else ""
            past = line_phon[-p+1:] if p > 1 and n >= 1 else [""]
            tail = [add, acc, *past]

        rhymes_dict.setdefault(ch, []).append(tail)

    return rhymes_dict




#               ФУНКЦИЯ СВЕРКИ 2-х рифм      
#  ??  возможен вариант сравнения не     все с первой строкой     а цепочкой    (есть ли отличия?)
def two_rhymes_fn(a_tail, b_tail, deep=None, mode=None, **kwargs) -> bool:
    """
    Проверяет рифму между двумя словами (разбитыми на слоги).
    Если deep/mode не переданы — берёт глобальные.
    """
    deep = DEEP if deep is None else deep
    mode = MODE if mode is None else mode
    # о deep (см комментарии в параметрах)

    ln = min(len(a_tail), len(b_tail))   # странный случай (теоритически может быть) - если в схеме хвост B длиннее хвоста A  лишок обрезаем  или браковать ??
    rez_a, rez_b = "", ""

    # вспомогательные функции обрезки
    def only_vowels(s): return "".join(ch for ch in s if ch in VOWELS)    
    def only_cons(s: str) -> str:
        """Заменяет гласные на '*' вместо удаления."""
        res = "".join(ch if ch not in VOWELS else "*" for ch in s)
        return res 
    def trim_first_cons_pair(a: str, b: str, deep) -> tuple[str, str]:
        """
        Обрезаем первую согласную, если активен deep == 3
        и оба слога не короткие и оканчиваются на согласную.
        """
        def trim_one(x):
            return x[1:] if len(x) > 2 and x[0] not in VOWELS else x     # ?????

        if deep == 3 and a and b and a[-1] not in VOWELS and b[-1] not in VOWELS:   # ?????
            return trim_one(a), trim_one(b)
        return a, b

    if isinstance(deep, int): 
        # эмуляция старого поведения — подставляем шаблон
        deep = DEEP_PRESETS.get(deep, [0,3,4])   # см комментарии в параметрах
    else:
        deep = list(deep)
        if len(deep) < ln:
            deep += [deep[-1]] * (ln - len(deep))

    # предварительно: deep приведён к list и длина >= ln
    for i in range(ln):
        a, b = a_tail[i], b_tail[i]

        base = deep[i]  # safe, потому что deep уже расширён до длины ln

        # кореляция глубины (DEEP) с чёткостью (MODE) рифмы для ударного слога
        # ударный слог — задаём нижний порог глубины в зависимости от mode
        if i == 1 and deep not in ([1, 1, 1], [2, 2, 2]):  # только для обычных рифм   ????? снять ограничения?
            if mode == 2:
                min_req = 3
            elif mode == 1:
                min_req = 2
            else:
                min_req = 1
            part_deep = max(min_req, base)
        else:
            part_deep = base

        # ограничим допустимый диапазон 
        part_deep = max(0, min(part_deep, 4))

        # для каждого слога выполняем обрезку (или оставляем целиком) согласно вектору
        if part_deep == 0 or not a or not b:  # нет одного из слогов - пропускаем  
            continue

        if part_deep == 1:
            a, b = only_vowels(a), only_vowels(b)    # берём только гласную
        elif part_deep == 2:
            a, b = only_cons(a), only_cons(b)        # берём только согласные с "*" вместо гласной (потом * удаляем)
        elif part_deep == 3:                         
            a, b = trim_first_cons_pair(a, b, part_deep)  # обрезаем первую согласную (если есть у обоих и они не короткие)

        # выбор карты: 
        use_maps = maps_for_syllable(i, mode)

        # применяем дополнительные карты (MAP_1 уже применён в pre-процессе)
        a = apply_maps_seq(a, use_maps)  
        b = apply_maps_seq(b, use_maps) 

        rez_a += a
        rez_b += b

    # вспомогательная функция обрезки последнего слога 
    # нестрогая рифмовка  без последней буквы  (козак глаза) 
    #  ???  не найдёт (грубо н/р) морква / морска   нужно пробовать обрезку не последнего слога (как у меня), а каждого слога.
    def trim_tail(x, y):    # ?????       и здесь можно дополнительно упрощать слово н/р сокращать группы согласных (или переставлять в них буквы)
        if mode == 0:
            min_len = 2   # очень мягкий: можно подрезать даже короткие
        elif mode == 1:
            min_len = 3   # стандартный
        else:
            min_len = 4   # строгий: режем только длинные хвосты

        if len(x) != len(y) and max(len(x), len(y)) >= min_len:
            if len(x) > len(y) and x[-1] not in VOWELS:
                x = x[:-1]
            elif len(y) > len(x) and y[-1] not in VOWELS:
                y = y[:-1]
        return x, y


    # ещё раз remove_doubles_cons к rez_a и rez_b    и replace "*" (если был only_cons)
    rez_a, rez_b = remove_doubles_cons(rez_a).replace("*", ""), remove_doubles_cons(rez_b).replace("*", "")
    rez_a, rez_b = trim_tail(rez_a, rez_b)

    # print(rez_a, rez_b)
    return (rez_a == rez_b), (rez_a, rez_b)


#              ГЛАВНАЯ ФУНКЦИЯ  проверка рифм
def check_rhymes(lines, rhymes=None, scheme=None, deep=None, mode=None):
    """
    Главная функция — распределяет строки и передаёт параметры в two_rhymes_fn().
    """
    # Подхватываем глобальные значения, если ничего не передано
    deep = DEEP if deep is None else deep
    mode = MODE if mode is None else mode

    if rhymes is None:
        rhymes = "abab"            # рифмовка по умолчанию
    if scheme is None:
        scheme = "+" * len(rhymes) # схема по умолчанию последние слоги

    log_norhyme = []
    log_rhyme = []

    if not lines:
        log_norhyme.append("NO TEXT")
        return log_norhyme, log_rhyme

    if isinstance(lines, str):
        lines = lines.splitlines()  # если текст, то делаем список строк

    #  убрать пустые строки и пробелы в начале строк
    lines = [line.lstrip() for line in lines if line.strip()]
    if not lines:
        return ["NO VALID LINES"], []

    if lines[0][0] == "*":  # отмеченные * пропускаем без проверки РИФМЫ
        return log_norhyme, log_rhyme          # ["ПРОПУСК *"]

    # ---------- ПРЕ-процессинг: применяем PRE_MAPS один раз ко всей строке ----------
    phon_list = []
    for line in lines:
        cleaned = clean_cyr_word(remove_doubles_cons(line.lower()) + " ", allowed_chars="", add=" ")
        pre = apply_maps_seq(cleaned, PRE_MAPS)   #  PRE_MAPS (MAP_1) применяются один раз
        pre = remove_doubles_cons(pre)
        phon_list.append(split_for_rhyme(pre))

    #print(phon_list)
    rhymes_dict = extract_rhyme_tail(phon_list, scheme, rhymes)

    """  ?    Проверяет rhymes_dict.
    - пропускает группы с < 2 элементов
    - если base (первый tail) пустой -> логируем (бракуем) эту группу
    - для каждой оставшейся пары сравниваем tail с base, при несовпадении логируем
    Возвращает список сообщений log_norhyme.
    """

    #print(rhymes_dict) 
    for group, tails in rhymes_dict.items():
        expected = rhymes.count(group)                 # сколько строк по схеме должно быть
        real_tails = [t for t in tails if t is not None]  # фильтруем отсутствующие (None)

        if len(real_tails) < expected:
            log_norhyme.append(
                f"Группа '{group}': в тексте не хватает строк по схеме (ожидалось {expected}, найдено {len(real_tails)})"
            )
            continue

        if len(real_tails) == 1:
            log_rhyme.append(f"Группа '{group}': одиночная группа - по схеме")
            continue

        base = real_tails[0]
        if not base: 
            log_norhyme.append(f"Группа '{group}': опорный хвост пуст (base пуст) — бракуем группу")
            continue

        # дальше используем real_tails вместо tails:
        for idx, tail in enumerate(real_tails[1:], start=2):
            ok, info = two_rhymes_fn(base, tail, deep, mode)

            if not tail:
                log_norhyme.append(f"Группа '{group}': элемент #{idx} — нет ударения/хвоста")

            if not ok:
                log_norhyme.append(f"Группа '{group}': элемент #{idx} — не рифмуется ({info})")
            else:
                log_rhyme.append(f"Группа '{group}': элемент #{idx} — рифмуется  ({info})")

    return log_norhyme, log_rhyme



#-------------------  мультирежим  -------------------------
# вспомогательные функции

def classify_deep(deep_val: int) -> str:
    """Определяет тип рифмы по значению глубины."""
    if deep_val == 0:
        return "АССОНАНС"
    elif deep_val == 1:
        return "КОНСОНАНС"
    else:
        return "ТОЧНАЯ"

def parse_log(msg: str):
    """
    Извлекает (group, idx, остальной_текст) из строки лога.
    Пример: "Группа 'a': элемент #2 — рифмуется (('на','на'))"
    → ('a', 2, "рифмуется (('на','на'))")
    """
    m = re.search(r"Группа '([^']+)': элемент #(\d+)\s*[—-]\s*(.*)", msg)
    if m:
        group, idx, text = m.groups()
        return group, int(idx), text.strip()
    else:
        # если формат другой — возвращаем всё целиком как "группу"
        return msg, 0, msg 
   

#      ОБЁРТКА для check_rhymes по всем комбинациям DEEP x MODE
def analyze_rhyme_levels(lines, rhymes=None, scheme=None):
    """
    Анализ рифм на всех уровнях.
    Перебирает комбинации MODE x DEEP (DEEP — ключи DEEP_PRESETS).
    Возвращает dict: key -> {       исправить?
        'level': 'ТОЧНАЯ'|'КОНСОНАНС'|'АССОНАНС'|'ОТСУТСТВУЕТ',
        'best_mode': int or None,   # mode из лучшей найденной пары
        'best_deep': int or None,   # deep (ключ из DEEP_PRESETS) из лучшей найденной пары
        'logs': [(mode, deep, message), ...],  # все сообщения со всех прогонов
        'hits': set((mode, deep), ...)        # пары (mode,deep), где была успешная рифма
    }
    Возвращает словарь с ключами (group, idx).        исправить?
    """
    results = {}
    MODES = [0, 1, 2]
    DEEPS = list(DEEP_PRESETS.keys())

    for mode in MODES:
        for deep_val in DEEPS:
            log_norhyme, log_rhyme = check_rhymes(
                lines, scheme=scheme, rhymes=rhymes,
                deep=deep_val, mode=mode
            )

            # успешные рифмы
            for msg in log_rhyme:
                group, idx, tail_info = parse_log(msg)
                key = (group, idx)
                if key not in results:
                    results[key] = {
                        'level': classify_deep(deep_val),
                        'best_mode': mode,
                        'best_deep': deep_val,
                        'logs': [msg],
                        'hits': {(mode, deep_val)},
                    }
                else:
                    results[key]['logs'].append(msg)
                    results[key]['hits'].add((mode, deep_val))
                    results[key]['best_mode'] = max(results[key]['best_mode'], mode)
                    results[key]['best_deep'] = max(results[key]['best_deep'], deep_val)
                    results[key]['level'] = classify_deep(deep_val)

            # неудачные рифмы
            for msg in log_norhyme:
                group, idx, tail_info = parse_log(msg)
                key = (group, idx)
                if key not in results:
                    results[key] = {
                        'level': 'ОТСУТСТВУЕТ',
                        'best_mode': -1,  # или 0, если 0 — минимальный уровень
                        'best_deep': -1,
                        'logs': [msg],
                        'hits': set(),
                    }
                else:
                    results[key]['logs'].append(msg)

    return results




# ?  если в хвосте есть "ь", то он должен быть в обоих хвостах  в одной и той же группе согласных ?? 
#      
#  ль - й  (боль - бой) ?     

"""            ДОПОЛНИТЕЛЬНО
если группа одинаковых букв (3?)        - брак по звуку
если группа из согласных (4?)           - брак по звуку      но: "пространство"  
• кластер согласных (особенно в финале) (>2 — грубовато)   (избегание трёх и более подряд согласных ;
• свистящие / шипящие (з,с,ш,щ,ж,ч) — сгребание или баланс;      ??
• аллитерация / ассонанс (повторы звуков усиливают образ)  Проверяем повтор согласных/гласных → отмечаем «аллитерация/ассонанс» ; 
+ мелодичностью фраз и “звуковой красотой” текста  // найти чёткий алгоритм ?
"""



# для наглядой печати 
def print_rhyme_table(results: dict):
    """
    Красиво печатает результаты analyze_rhyme_levels.
    Формат:  | ГРУППА | № | УРОВЕНЬ     | MODE | DEEP | ПОПАДАНИЯ |
    """
    if not results:
        print("Нет данных для отображения.")
        return

    header = f"{'ГРУППА':<8} {'№':<3} {'УРОВЕНЬ':<12} {'MODE':<5} {'DEEP':<5} {'ПОПАДАНИЯ'}"
    print(header)
    print("-" * len(header))

    for (group, idx), data in sorted(results.items()):
        level = data.get('level', '—')
        mode = str(data.get('best_mode')) if data.get('best_mode') is not None else "—"
        deep = str(data.get('best_deep')) if data.get('best_deep') is not None else "—"
        hits = ", ".join(f"{m}/{d}" for m, d in sorted(data.get('hits', [])))
        print(f"{group:<8} {idx:<3} {level:<12} {mode:<5} {deep:<5} {hits}")


if __name__ == "__main__":
    poem = """
я щи ищу а тут я  песня 
лишь пустота голодных один  морска
ну хоть бы раз сварила вестня 
один щ   морква 
    """
    l1, l2 = check_rhymes(poem, "abab", ("+-", "+", "+-", "+"))
    print(l1)
    print(l2)


    out = analyze_rhyme_levels(poem, "abab", ("+-", "+", "+-", "+"))
    print_rhyme_table(out)


