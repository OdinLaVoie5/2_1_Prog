# rhyme.py  для  analyze_poem        ПРОВЕРКА РИФМ
# EXPE     улучшенный вариант      
# см readme_rhyme.txt
# нужно найти пороговые значения коэффициентов.
# Неопределённость между “почти рифмой” и “рифмой” требует акустических экспериментов.
 

import re
from itertools import product
from clean import clean_cyr_word
from config import * 


#########################    ПАРАМЕТРЫ    ##########################
####################################################################
#    стихи отмеченные * (на месте первой буквы) ПРОПУСКАЕМ БЕЗ ПРОВЕРКИ РИФМЫ

# см в других вариантах rhyme.py    здесь параметры ушли в код

# Веса для MODE (умножители) и для ударного слога
# MODE_WEIGHTS: более высокий режим даёт больший вклад
MODE_WEIGHTS = {0: 1.0, 1: 1.5, 2: 2.0}
STRESS_WEIGHT = 4.0  # умножитель для ударного слога (можно настроить)
NORM_KOEFF = 60.0  #5.0 нормировочный коэффициент для суммы глубин (макс возможная сумма)

####################################################################


#   сделал полный перебор векторов от [0,1,1] до ...
#   дактилической и гипердактилической рифмой   векторю все слоги 
# рассматривать и предпредударный слог (если есть)  ?    много комбинаторики

#  дб  не будет ли проблем с возможным куском (псевдослогом) без гласной  (страх - ст ра х)    - вроде нет.
#      AI: Псевдослоги без гласных можно либо сравнивать, либо игнорировать; решение — гибкое 
#  ??   эксперимент - прогон с ударением (даже неправильным) на один слог глубже (левее)
#  ??  а если усложнить задачу?  схема рифмовки (и ударений) не дана  - найти их по данному стихотворению 

"""дружба / служба засчитываются, хотя лексически это морфемная рифма (менее поэтичная).
Можно добавить простое правило: если совпадает более 60% исходного слова → штраф.
if overlap_len / min(len(a), len(b)) > 0.6:
    score -= 1
"""

#   (учёт логического ударения    и интонации)

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


def prepare_phon_list(lines):
    """
    Предобработка строк: нормализация, удаление пустых, применение PRE_MAPS и
    разбиение на условные слоги (phon_list).

    Возвращает кортеж (lines_list, phon_list).
    lines_list — список обработанных (stripped) строк, готовых для дальнейшей
    проверки. phon_list — список списков слогов для
    каждой строки.
    """
    if isinstance(lines, str):
        lines = lines.splitlines()

    # убрать пустые строки и пробелы в начале строк
    lines_list = [line.lstrip() for line in lines if line and line.strip()]
    if not lines_list:
        return lines_list, []

    phon_list = []
    for line in lines_list:
        cleaned = clean_cyr_word(remove_doubles_cons(line.lower()) + " ", allowed_chars="", add=" ")
        pre = apply_maps_seq(cleaned, PRE_MAPS)
        pre = remove_doubles_cons(pre)
        phon_list.append(split_for_rhyme(pre))

    return lines_list, phon_list


# возвращает словарь с ещё не проверенными рифмами
def extract_rhyme_tail(phon_list: list[list[str]], scheme, rhymes: str):
    """
    Возвращает dict: ключ = буква метки рифмы, значение = список tail'ов.
    Для отсутствующих строк (если текст короче схемы) добавляется None.
    """
    rhymes_dict = {}
    # проходим по всем позициям схемы рифмовки, даже если phon_list короче
    for i in range(len(rhymes)):
        ch = rhymes[i]
        if ch == "_":    # а если все  _ ??
            # в шаблоне _ означает игнорирование позиции — не добавляем ничего
            continue

        # безопасно получить scheme[i] (может быть None или короче)
        scheme_i = scheme[i] if scheme and i < len(scheme) else None

        # если у нас нет соответствующей строки текста — добавляем None 
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
            p = len(scheme_i) - idx        # позиция (с конца) ударного (1 — последний слог)
            n = len(line_phon)

            add  = line_phon[-p-1] if ((n > p) and (p < 3)) else "" # предударный     у дактильной рифмы не берём
            acc  = line_phon[-p]   if n >= p else ""
            past = line_phon[-p+1:] if p > 1 and n >= 1 else [""]
            tail = [add, acc, *past]

        rhymes_dict.setdefault(ch, []).append(tail)

    return rhymes_dict


# --------------- ОЦЕНКА ОДНОЙ ГРУППЫ РИФМ  ------------------
def evaluate_rhyme_group(tails, expected, deep, mode):
    """
    Оценить одну группу рифм (логика MISSING / MISSING_NORM / NORHYME / hits).
    Возвращает словарь с результатом для этой группы.
    """
    result = {"ok": True}

    real_tails = [t for t in tails if t is not None]

    if len(real_tails) < expected:
        result["ok"] = False
        result["comment"] = "MISSING"
        return result

    if len(real_tails) == 1:
        result["ok"] = True
        result["comment"] = "MISSING_NORM"
        return result

    base = real_tails[0]
    if not base:
        result["ok"] = False
        result["comment"] = "MISSING"
        return result

    pair_scores = []
    for idx, tail in enumerate(real_tails[1:], start=2):
        ok, info = two_rhymes_fn(base, tail, deep, mode)

        if not tail:
            result["ok"] = False
            result["comment"] = "MISSING"
            continue

        if not ok:
            result["ok"] = False
            result["comment"] = "NORHYME"
            continue

        # info expected: (rez_a, rez_b, sum_deep, ln)
        try:
            rez_a, rez_b, sum_deep, ln = info
        except Exception:
            # backward compatibility: if info is tuple (rez_a, rez_b)
            rez_a, rez_b = info[0], info[1]
            sum_deep = 0
            ln = max(len(rez_a), len(rez_b))

        # если оба результирующих сравниваемых фрагмента пусты — это не совпадение,
        # не учитываем как hit и не добавляем в pair_scores
        if not rez_a and not rez_b:
            result["ok"] = False
            result["comment"] = "MISSING"
            continue

        # считаем только накопленную глубину, делим на NORM_KOEFF чтобы нормировать в диапазон [0..1]
        pair_score = sum_deep / NORM_KOEFF if sum_deep > 0 else 0.0

        pair_scores.append(pair_score)
        result.setdefault("pair_scores", []).append((idx, pair_score, (rez_a, rez_b)))

    # средний скор по всем удачным парам (если есть)
    if pair_scores:
        result["group_score"] = sum(pair_scores) / len(pair_scores)

    return result




#               ФУНКЦИЯ СВЕРКИ 2-х рифм      
#  ??  возможен вариант сравнения не     все с первой строкой     а цепочкой    (есть ли отличия?)
def two_rhymes_fn(a_tail, b_tail, deep, mode, **kwargs) -> bool:
    """
    Проверяет рифму между двумя словами (разбитыми на слоги).
    Если deep/mode не переданы — берёт по умолчанию.
    """

    ln = min(len(a_tail), len(b_tail))   # странный случай (теоритически может быть) - если в схеме хвост B длиннее хвоста A  лишок обрезаем  или браковать ??
    rez_a, rez_b = "", ""

    # вспомогательные функции обрезки
    def only_vowels(s): return "".join(ch for ch in s if ch in VOWELS)    
    def only_cons(s: str) -> str:
        """Заменяет гласные на '*' вместо удаления."""
        res = "".join(ch if ch not in VOWELS else "*" for ch in s)
        return res 
    def trim_first_cons(s: str) -> str:
        return s[1:] if s[0] not in VOWELS else s
    def trim_last_cons(s: str) -> str:
        while s and s[-1] not in VOWELS:
            s = s[:-1]
        return s

    if len(deep) < ln:    # расширяем вектор глубины до нужной длины
        deep += [deep[-1]] * (ln - len(deep))

    sum_deep = 0

    # предварительно: deep приведён к list и длина >= ln
    mode_mult = MODE_WEIGHTS.get(mode, 1.0)
    for i in range(ln):
        a, b = a_tail[i], b_tail[i]

        part_deep = deep[i]  # safe, потому что deep уже расширён до длины ln

        # ограничим допустимый диапазон    0 и 5 можно сделать переменными  ??
        part_deep = max(0, min(part_deep, 5))
        part_ln = min(len(a), len(b))

        # для каждого слога выполняем обрезку (или оставляем целиком) согласно вектору
        if part_deep == 0 or not a or not b:  # нет одного из слогов - пропускаем  
            continue

        # определим, является ли слог ударным — в tail'ах аккумуляция делалась как
        # [add, acc, *past], поэтому индекс 1 соответствует ударному слогу, если он есть
        stressed = (i == 1) and (len(a_tail) > 1 or len(b_tail) > 1)

        # учитываем глубину с коэффициентами для ударного слога и режима
        weight = (STRESS_WEIGHT if stressed else 1.0) * mode_mult
        sum_deep += part_deep * weight * part_ln

        if part_deep == 1:
            a, b = only_vowels(a), only_vowels(b)    # берём только гласную
        elif part_deep == 2:
            a, b = only_cons(a), only_cons(b)        # берём только согласные с "*" вместо гласной (потом * удаляем)
        elif part_deep == 3:                         
            a, b = trim_last_cons(a), trim_last_cons(b)  # обрезаем последнюю согласную 
        elif part_deep == 4:                         
            a, b = trim_first_cons(a), trim_first_cons(b)  # обрезаем первую согласную 

        # выбор карты: 
        use_maps = maps_for_syllable(i, mode)

        # применяем дополнительные карты (MAP_1 уже применён в pre-процессе)
        a = apply_maps_seq(a, use_maps)  
        b = apply_maps_seq(b, use_maps) 

        rez_a += a
        rez_b += b

    # ещё раз remove_doubles_cons к rez_a и rez_b    и replace "*" (если был only_cons)
    rez_a, rez_b = remove_doubles_cons(rez_a).replace("*", ""), remove_doubles_cons(rez_b).replace("*", "")


    ln_res = min(len(rez_a), len(rez_b))

    # Если длина результата 0 - считаем рифму неудачной
    if ln_res == 0:
        return False, (rez_a, rez_b, sum_deep, ln_res)

    # Возвращаем также суммарную глубину и длину для простого количественного
    # анализа: info = (rez_a, rez_b, sum_deep, ln_res)
    return (rez_a == rez_b), (rez_a, rez_b, sum_deep, ln_res)


#              ГЛАВНАЯ ФУНКЦИЯ  проверка рифм
#-------------------  мультирежим  -------------------------
#    перебор по всем (?) комбинациям DEEP x MODE
#  ???  уменьшить перебор - если нет какого-либо слога - не перебирать по нему (взять миним ил максим)
#  при нахождении положительных результатов отдельно по каждому mode -  остановить перебор
def check_rhymes(lines, rhymes=None, scheme=None):  # переименовал analyze_rhyme_levels
    """
    Анализ рифм на всех уровнях.
    Перебирает комбинации MODE x DEEP 
    """
    if isinstance(lines, str):
        lines = lines.splitlines()  # если текст, то делаем список строк

    # сначала проверяем на * (пробел) в начале первой непустой строки
    lines_list = [line.lstrip() for line in lines if line and line.strip()]
    if not lines_list:
        return [], []

    # если первая строка начинается с * (пробел) - пропускаем проверку рифм,
    # но возвращаем ok=True в первом же результате
    if lines_list[0].startswith('* '):
        # создаём фиктивный результат с ok=True для пропущенного текста
        result = {"ok": True, "comment": "SKIP"}
        return [(f"0_skip", {"a": result})], []

    # если нет * - делаем полную подготовку через общую функцию
    lines, phon_list = prepare_phon_list(lines)
    if not lines:
        return [], []

    # максимальное число условных слогов в строке
    max_syllables = max((len(p) for p in phon_list), default=1)

    # Соберём словарь хвостов по схеме один раз и будем итерировать только
    # по его непустым записям (это экономит работу — не проверяем полностью
    # отсутствующие группы).
    rhymes_dict = extract_rhyme_tail(phon_list, scheme, rhymes)

    # число слогов, которые присутствуют в rhymes_dict (максимальная длинa tail)
    # учитываем только непустые tail'ы (t is not None)
    rhyme_syllables = max(
        (len(t) for tails in rhymes_dict.values() for t in tails if t is not None),
        default=1,
    )

    # целевая длина вектора глубины: минимум 3 (старое поведение), максимум —
    # минимальное значение между фактическим max_syllables и числом слогов в
    # rhymes_dict.
    target_len = max(3, min(max_syllables, rhyme_syllables))

    res_yes = []
    res_no = []
    MODES = [0, 1, 2]

    for mode in MODES:
        for deep_vec in product(range(6), repeat=target_len):
            k = f"{mode}_{''.join(map(str, deep_vec))}"
            result_for_deep = {}

            # обрабатываем только группы из rhymes_dict (внутри учитываем
            # реальные хвосты и помечаем MISSING / MISSING_NORM, как раньше)

            for group, tails in rhymes_dict.items():
                expected = rhymes.count(group)
                result_for_deep[group] = evaluate_rhyme_group(
                    tails, expected, list(deep_vec), mode)

            # агрегируем скор по группам для этого вектора (среднее group_score)
            group_scores = [g.get("group_score") for g in result_for_deep.values() if g.get("group_score") is not None]
            if group_scores:        # нужен ли?
                result_for_deep["_score"] = sum(group_scores) / len(group_scores)
            else:
                result_for_deep["_score"] = 0.0

            # классифицируем полученный вектор: если есть хоть одна группа с ok == False
            # то относим вектор в res_no, иначе в res_yes
            # Пропускаем служебные поля (например, "_score"), которые не являются dict
            has_false = any(not (g.get("ok", False)) for g in result_for_deep.values() if isinstance(g, dict))
            if has_false:
                res_no.append((k, result_for_deep))
            else:
                res_yes.append((k, result_for_deep))

    print("=========")
    print("res_yes:", len(res_yes), "items")
    print("res_no:", len(res_no), "items")
    print("==================")

    res_all_no = []
    if not res_yes:   # если нет положительных результатов - логируем fail  
        res_all_no = ["fail"]
 

    return res_all_no, res_yes          #, res_no 




# ?  если в хвосте есть "ь", то он должен быть в обоих хвостах  в одной и той же группе согласных ?? 
#      
#  ль - й  (боль - бой) ?     

"""     ???       ДОПОЛНИТЕЛЬНО
если группа одинаковых букв (3?)        - брак по звуку
если группа из согласных (4?)           - брак по звуку      но: "пространство"  
• кластер согласных (особенно в финале) (>2 — грубовато)   (избегание трёх и более подряд согласных ;
• свистящие / шипящие (з,с,ш,щ,ж,ч) — сгребание или баланс;      ??
• аллитерация / ассонанс (повторы звуков усиливают образ)  Проверяем повтор согласных/гласных → отмечаем «аллитерация/ассонанс» ; 
+ мелодичностью фраз и “звуковой красотой” текста  // найти чёткий алгоритм ?
"""



if __name__ == "__main__":
    poem = """
        в ДОМ вхо'дят будущего люди
        у каж-дого  ружьё и штык
        и в на'ши мелкие проблемы
иж дыг
    """

    """ (poem, "abab", ("+--", "+-", "+--", "+-"))
    """

    n, y = check_rhymes(poem, "_b_b", ("+-", "+", "+-", "+"))
    print(n)
    print(y)


