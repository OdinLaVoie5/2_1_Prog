# linebreaks_restore.py     МОЖЕТ РАБОТАТЬ НЕ КОРЕКТНО  ??
from difflib import ndiff, SequenceMatcher
from collections import Counter
from typing import List, Tuple, Dict, Callable, Union


# ======= СОСТАВЛЯЕМ КАРТУ ПЕРЕНОСОВ =======
def words_and_map(text: str) -> Tuple[List[str], List[int]]:
    """
    Возвращает (words, word_map).
    word_map содержит позиции (число слов до переноса), например [3, 6].
    Сохраняет переносы как отдельный токен '\n'.
    """
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # делаем '\n' отдельным токеном, затем split по одиночному пробелу,
    # чтобы не терять маркеры '\n'
    spaced = text.replace('\n', ' \n ')
    parts = spaced.split(' ')  # split(' ') сохраняет пустые элементы для множественных пробелов
    tokens = [p for p in parts if p != '']  # удаляем пустые элементы, но сохраняем '\n'
    words = []
    word_map = []
    wcount = 0
    for t in tokens:
        if t == '\n':
            # перенос после wcount слов (то есть между wcount-1 и wcount)
            word_map.append(wcount)
        else:
            words.append(t)
            wcount += 1
    return words, word_map

def _ensure_list_words(out) -> List[str]:
    """Нормализует результат процессора в список слов."""
    if isinstance(out, list):
        return out
    if isinstance(out, str):
        return out.split()
    # любая итерируемая последовательность
    return list(out)

def try_process(before_words: List[str], processor: Callable) -> List[str]:
    out = processor(' '.join(before_words))
    return _ensure_list_words(out)


def map_boundaries(before: List[str], after: List[str], positions: List[int], context: int = 3) -> List[int]:
    """
    Более устойчивая карта переносов:
      - для каждой позиции pos в `before` пытаемся найти в `after` индекс j,
        где сохранился (как можно точнее) разрыв между словами.
      - используем контекст (context слов слева и справа) для выбора лучшего j.
      - если контекст не дал результата, используем пропорциональное масштабирование.
      - в конце гарантируем возрастающую последовательность и отсутствие дублей.
    """
    B = len(before)
    A = len(after)
    if B == 0:
        # если до было пусто — все переносы на 0..A
        return [min(pos, A) for pos in positions]

    scale = A / B if B else 1.0
    mapped = []

    # удобные вспомогательные лямбды
    def left_context(pos):
        i0 = max(0, pos - context)
        return before[i0:pos]

    def right_context(pos):
        i1 = min(B, pos + context)
        return before[pos:i1]

    for pos in positions:
        # крайние случаи
        if pos <= 0:
            mapped.append(0)
            continue
        if pos >= B:
            mapped.append(A)
            continue

        left = left_context(pos)
        right = right_context(pos)

        best_j = None
        best_score = -1
        # оценочный центр — пропорционально
        est_center = int(round(pos * scale))

        # пробегаем возможные разделы j (между словами в after: 0..A)
        # для каждого j считаем сколько слов совпало слева/справа подряд (последовательность)
        for j in range(0, A + 1):
            # подсчёт совпадений слева (сколько слов из left совпадают подряд, считая с конца)
            left_match = 0
            for k in range(1, len(left) + 1):
                if j - k < 0:
                    break
                if after[j - k] == left[-k]:
                    left_match += 1
                else:
                    break

            # подсчёт совпадений справа (сколько слов из right совпадают подряд, считая с начала)
            right_match = 0
            for k in range(0, len(right)):
                if j + k >= A:
                    break
                if after[j + k] == right[k]:
                    right_match += 1
                else:
                    break

            score = left_match + right_match

            # предпочтение большему score; при равенстве — ближе к пропорции
            dist = abs(j - est_center)
            if score > best_score or (score == best_score and (best_j is None or dist < abs(best_j - est_center))):
                best_score = score
                best_j = j

        # если вообще ничто не совпало, fallback на пропорцию
        if best_score <= 0:
            j_est = int(round(pos * scale))
        else:
            j_est = best_j

        # гарантируем диапазон
        j_est = max(0, min(A, j_est))
        mapped.append(j_est)

    # Наконец — гарантируем строго не убывающую (возрастающую) последовательность
    cleaned = []
    prev = -1
    for m in mapped:
        if m <= prev:
            m = prev + 1
        if m > A:
            m = A
        cleaned.append(m)
        prev = m

    # Удаляем возможные дубли (но сохраняем порядок)
    result = []
    last = None
    for x in cleaned:
        if last is None or x != last:
            result.append(x)
            last = x

    return result


def restorelinebreaks_from_words(words: List[str], word_map: List[int]) -> str:
    counts = Counter(word_map)
    lines = []
    # переносы в начале (если есть позиции 0)
    for _ in range(counts.get(0, 0)):
        lines.append('')
    current = []
    for i, w in enumerate(words, start=1):
        current.append(w)
        c = counts.get(i, 0)
        if c:
            lines.append(' '.join(current))
            for _ in range(c - 1):
                lines.append('')  # пустые строки при последовательных переносах
            current = []
    if current:
        lines.append(' '.join(current))
    # 👇 вот это добиваем для финального переноса
    if word_map and word_map[-1] == len(words):
        lines.append('')
    return '\n'.join(lines)

# ======= ГЛАВНАЯ ФУНКЦИЯ =======
# принимает текст и процессор (или список процессоров)
#  переделал на вариант и с str  и со списком параметров (со str dj главе)  на входе?

def linebreaks_restore(
    text: str,
    processor: Union[Callable, List],
) -> Dict:
    """   !!!
    Универсальная обёртка:
      - строит карту переносов по словам,
      - прогоняет текст через processor,
      - восстанавливает '\n' по карте.
    processor может быть:
        - Callable
        - list[Callable]
        - list: [func, arg1, arg2, ...] (первый элемент функция, остальное параметры)
    """
    before_words, old_map = words_and_map(text)

    processed = text

    # --- 1. простой вызов функции ---
    if callable(processor):
        processed = processor(processed)

    # --- 2. список функций подряд ---
    elif isinstance(processor, list) and all(callable(f) for f in processor):
        for func in processor:
            processed = func(processed)

    # --- 3. список вида [func, args...] ---
    elif isinstance(processor, list) and callable(processor[0]):
        func, *args = processor
        kwargs = {}
        # вытаскиваем словари как kwargs
        for a in args:
            if isinstance(a, dict):
                kwargs.update(a)
        # всё остальное → позиционные аргументы
        pos_args = [a for a in args if not isinstance(a, dict)]
        processed = func(processed, *pos_args, **kwargs)

    else:
        raise ValueError(f"Неподдерживаемый тип processor: {type(processor)}")

    # --- нормализация ---
    after_words = processed.split()
    new_map = map_boundaries(before_words, after_words, old_map)
    restored = restorelinebreaks_from_words(after_words, new_map)

    diff = list(ndiff(before_words, after_words))
    added   = [w[2:] for w in diff if w.startswith('+ ')]
    removed = [w[2:] for w in diff if w.startswith('- ')]
    saved   = [w[2:] for w in diff if w.startswith('  ')]

    report = {
        "restored": restored, 
        'before_words': before_words,
        'after_words': after_words,
        'old_map': old_map,
        'new_map': new_map,
        "diff_raw": diff,
        "added": added,
        "removed": removed,
        "saved": saved,
    }

    return report 




if __name__ == "__main__":

    text= """на слете юных и прекрасных 
на сползе старых и больных 
на съезде тех же но в колясках 
триптих 
© ОлегОлег"""

    # ========== ТЕСТЫ ==========
    # # ===== процессоры =====

    def expand_25(tokens):
        """Расширяет '25' → 'двадцать пять'"""
        out = []
        for t in tokens.split():
            if t == "25":
                out.extend(["двадцать", "пять"])
            else:
                out.append(t)
        return " ".join(out)

    def remove_word(tokens):
        """Удаляет 'жопа'"""
        return [t for t in tokens if t != "жопа"]

    def identity(tokens):
        """Возвращает как есть"""
        return tokens

    def monster_processor(tokens):
        """
        Комбинированный:
        - заменяет 25 → двадцать пять
        - удаляет X
        """
        out = []
        for t in tokens:
            if t == "25":
                out.extend(["двадцать", "пять"])
            elif t == "X":
                continue
            else:
                out.append(t)
        return out

    print(linebreaks_restore(text, expand_25)["restored"])
