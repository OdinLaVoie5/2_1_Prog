# linebreaks_restore.py
from difflib import ndiff, SequenceMatcher
from typing import List, Tuple, Dict, Callable, Union
import textwrap


def words_and_map(text: str) -> Tuple[List[str], List[int]]:
    """
    Разбивает текст на слова и карту переносов, включая пустые строки.
    Возвращает (words, word_map). word_map содержит позицию (число слов
    до конца каждой строки) для каждой исходной строки (включая пустые).
    """
    # убираем лишние отступы в многострочных литералах, но сохраняем ведущие/внутренние/концевые пустые строки
    text = textwrap.dedent(text)
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    lines = text.split('\n')

    words: List[str] = []
    word_map: List[int] = []
    count = 0

    for line in lines:
        parts = line.split()
        if parts:
            words.extend(parts)
            count += len(parts)
        # после каждой строки (включая пустые) фиксируем позицию count
        word_map.append(count)

    return words, word_map


def _ensure_list_words(out) -> List[str]:
    """Нормализует результат процессора в список слов."""
    if isinstance(out, list):
        return out
    if isinstance(out, str):
        return out.split()
    return list(out)


def try_process(before_words: List[str], processor: Callable) -> List[str]:
    out = processor(' '.join(before_words))
    return _ensure_list_words(out)


def map_boundaries(before: List[str], after: List[str], positions: List[int],
                   context: int = 3, window: int = 60) -> List[int]:
    """
    Сопоставляет позиции переносов из before -> after.
    Алгоритм:
      - для каждой позиции pos (число слов до переноса в before)
        пытаемся найти оптимальную позицию j в after
        опираясь на контекст слева и справа (context) и оценивая в окне ±window
      - fallback: пропорциональное масштабирование pos -> round(pos * scale)
      - результат имеет ту же длину, что и positions; допускает дубликаты
        (дубликаты означают последовательные пустые строки).
      - результат не будет убывать (неубывающий список).
    """
    B = len(before)
    A = len(after)
    if B == 0:
        # если до было пусто — просто ограничиваем позиции по A
        return [min(pos, A) for pos in positions]

    scale = A / B if B else 1.0
    mapped: List[int] = []

    # подготовим удобные срезы для before
    for pos in positions:
        # крайние случаи
        if pos <= 0:
            mapped.append(0)
            continue
        if pos >= B:
            mapped.append(A)
            continue

        # контексты
        left = before[max(0, pos - context):pos]
        right = before[pos:min(B, pos + context)]

        est = int(round(pos * scale))
        lo = max(0, est - window)
        hi = min(A, est + window)

        best_j = None
        best_score = -1

        # ищем в окрестности est
        for j in range(lo, hi + 1):
            # совпадения слева (считаем подряд от границы)
            left_match = 0
            for k in range(1, len(left) + 1):
                if j - k < 0:
                    break
                if after[j - k] == left[-k]:
                    left_match += 1
                else:
                    break

            # совпадения справа (считаем подряд от границы)
            right_match = 0
            for k in range(0, len(right)):
                if j + k >= A:
                    break
                if after[j + k] == right[k]:
                    right_match += 1
                else:
                    break

            score = left_match + right_match
            dist = abs(j - est)

            # выбираем по наибольшему score, при равенстве — ближе к est
            if score > best_score or (score == best_score and (best_j is None or dist < abs(best_j - est))):
                best_score = score
                best_j = j

        # если контекст не помог — fallback на пропорцию на всём диапазоне
        if best_score <= 0 or best_j is None:
            j_est = int(round(pos * scale))
        else:
            j_est = best_j

        # в пределах 0..A
        j_est = max(0, min(A, j_est))
        mapped.append(j_est)

    # Гарантируем неубывающую последовательность (не уменьшаем позиции),
    # но допускаем равные значения (дубликаты — это множественные пустые строки).
    cleaned: List[int] = []
    prev = -1
    for m in mapped:
        if m < prev:
            m = prev
        cleaned.append(m)
        prev = m

    return cleaned


def restorelinebreaks_from_words(words: List[str], word_map: List[int]) -> str:
    """
    Восстанавливает текст построчно по списку слов и карте переносов.
    Принцип максимально простой и надёжный:
      для каждой позиции pos в word_map берём срез words[prev:pos] -> строка,
      prev := pos (и так далее). Пустые строки — это срезы нулевой длины.
    """
    if not word_map:
        # нет карты — просто соберём слова в одну строку (или пустую строку)
        return ' '.join(words) if words else ''

    lines: List[str] = []
    prev = 0
    for pos in word_map:
        # гарантируем валидацию
        pos = max(0, min(len(words), pos))
        lines.append(' '.join(words[prev:pos]))
        prev = pos

    # хвост (если после последней позиции остались слова)
    if prev < len(words):
        lines.append(' '.join(words[prev:]))

    return '\n'.join(lines)


def linebreaks_restore(
    text: str,
    processor: Union[Callable, List],
) -> Dict:
    """
    Универсальная обёртка:
      - строит карту переносов по словам,
      - прогоняет текст через processor,
      - восстанавливает '\n' по карте.
    processor может быть:
        - Callable
        - list[Callable]
        - list: [func, arg1, arg2, ...] (первый элемент функция, остальное параметры)
    Возвращает словарь с диагностикой.
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
        for a in args:
            if isinstance(a, dict):
                kwargs.update(a)
        pos_args = [a for a in args if not isinstance(a, dict)]
        processed = func(processed, *pos_args, **kwargs)

    else:
        raise ValueError(f"Неподдерживаемый тип processor: {type(processor)}")

    # --- нормализация ---
    after_words = processed.split()
    new_map = map_boundaries(before_words, after_words, old_map)
    restored = restorelinebreaks_from_words(after_words, new_map)

    diff = list(ndiff(before_words, after_words))
    added = [w[2:] for w in diff if w.startswith('+ ')]
    removed = [w[2:] for w in diff if w.startswith('- ')]
    saved = [w[2:] for w in diff if w.startswith('  ')]

    report = {
        "restored": restored,
        "before_words": before_words,
        "after_words": after_words,
        "old_map": old_map,
        "new_map": new_map,
        "diff_raw": diff,
        "added": added,
        "removed": removed,
        "saved": saved,
    }

    return report


if __name__ == "__main__":
    text = """
    мне семь мне десять мне пятнадцать 
    мне двадцать три мне тридцать пять     
    не всем дневник минималиста 
    понять
    """

    # тестовый процессор (пример: расширение "25" -> "двадцать пять")
    def expand_25(tokens):
        out = []
        for t in tokens.split():
            if t == "25":
                out.extend(["двадцать", "пять"])
            else:
                out.append(t)
        return " ".join(out)

    rep = linebreaks_restore(text, expand_25)
    print("=== restored ===")
    print(rep["restored"])
    print("=== debug ===")
    print("before_words:", rep["before_words"])
    print("old_map:   ", rep["old_map"])
    print("after_words:", rep["after_words"])
    print("new_map:   ", rep["new_map"])
