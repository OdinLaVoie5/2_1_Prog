import re
from typing import Callable, Pattern



# ПРИМЕНЯЕМ ФУНКЦИЮ К СОВПАДАЮЩИМ С ПАТТЕРНОМ ОТРЫВКАМ СТРОК !!!!!   с логом 
# применяет transform_func к каждому совпадению в каждой строке
# возвращает список строк после замен и список строк с описанием изменений
# принимает текст в виде строки или списка строк и паттерн (или регулярное выражение) и функцию
def transform_lines_and_log(
    lines: list[str] | str,
    pattern: str | Pattern,
    transform_func: Callable[[str], str]
) -> tuple[list[str], list[str]]:
    """
        Применяет transform_func к каждому совпадению в каждой строке.
        Возвращает:
            cleaned_lines — список строк после замен
            log — список строк с описанием изменений
    """    
    if isinstance(lines, str):
        lines = lines.splitlines()

    # если pattern — строка, компилируем один раз
    regex = re.compile(pattern, flags=re.UNICODE) if isinstance(pattern, str) else pattern

    cleaned = []
    log = []

    for i, line in enumerate(lines):
        def replacer(m: re.Match) -> str:
            original = m.group(0)
            transformed = transform_func(original)
            if transformed != original:
                if not log:
                    log.append("SYMBOLS:")  # добавляем заголовок
                log.append(f"{i+1} line: '{original}' → '{transformed}'")
            return transformed

        new_line = regex.sub(replacer, line)
        new_line = (" ").join(new_line.split())
        cleaned.append(new_line)

    return cleaned, log




# ПРИМЕНЯЕМ ФУНКЦИЮ К СОВПАДАЮЩИМ С ПАТТЕРНОМ ОТРЫВКАМ СТРОК !!!!
def transform_matches(text: str, pattern: str, transform_func) -> str:
    """
    Находит все куски, совпадающие с pattern, 
    применяет к ним transform_func(match_text) 
    и возвращает изменённый текст.
    """
    regex = re.compile(pattern)

    def replacer(m):
        original = m.group(0)
        transformed = transform_func(original)
        return transformed

    return regex.sub(replacer, text)



# ЧИСТИМ ТЕКСТ ПО ПАТТЕРНУ  !!!
def clean_and_log(lines: list[str] | str, regex: re.Pattern,  remove: bool = True) -> tuple[list[str], list[str]]:
    """
    Удаляет из строк все совпадения с заданным паттерном
    и логирует строки, в которых были найдены такие совпадения.

    Возвращает:
        cleaned_lines: список строк после удаления
        log: список строк с информацией о найденных символах
    """
    if isinstance(lines, str):
        lines = lines.splitlines()
        
    cleaned_lines = []
    log = []

    for i, line in enumerate(lines):
        matches = regex.findall(line)
        if matches:
            log.append(f"[LINE {i+1}] FOUND: {matches}")
            log.append(line)
            if remove:
                line = regex.sub("", line)
        cleaned_lines.append(line)

    return cleaned_lines, log



# нормализация текста
def normalize_text(lines: list[str]) -> list[str]:
    """
    Нормализует список строк:
      1. Убирает пустые строки, табы, пробелы по краям и лишние пробелы.
      2. Переводит всё в нижний регистр.
    """
    normalized = []
    for line in lines:
        # 1. Чистим табы и лишние пробелы
        line = line.replace("\t", " ")
        line = " ".join(line.split())

        # 2. Приводим к нижнему регистру
        line = line.lower()

        # Убираем пустые строки
        if line: normalized.append(line)

    return normalized





if __name__ == "__main__":
    ALLOWED_CHARS = "+"   # рабочие символы (разрешаются в тексте)
    pattern_letters = rf"[^\w\s{re.escape(ALLOWED_CHARS)}]+|_"     # всё кроме букв, цифр, пробелов и разрешённых символов
    pattern_cyrillic = rf"[^\sа-яА-ЯёЁ{re.escape(ALLOWED_CHARS)}]+"  # всё кроме кириллицы, пробелов и разрешённых символов
    regex_let = re.compile(pattern_letters) # компилируем регулярку, чтобы ускорить поиск 
    regex_cyr = re.compile(pattern_cyrillic)
    # Одновременное использование f-строки и r (сырых строк). Здесь в {} нельзя экранировать \. 
    # поэтому применяется re.escape !!!!  
    # Перед использованием сложных rf-строк всегда можно вывести их: print(repr(pattern))
    #      print(repr(pattern_cyrillic))

    poem = [
        "мне 74 лет",
        "hello 13 мир!",
        "мир@^ — привет!",
    ]

    cleaned1, log1 = clean_and_log(poem, regex_let)
    cleaned2, log2 = clean_and_log(poem, regex_cyr)

    # print("=== CLEANED ===")
    # print("\n".join(cleaned2))
    # print("=== LOG ===")
    # print("\n".join(log2))


    text = "abc123xyz45"
    res = transform_matches(text, r"\D+", lambda s: "")
    # print(res)     # → "12345"
    res = transform_matches(text, r"\D+", lambda s: f"[{s.upper()}]")
    # print(res)     # → "[ABC]123[DEF]456"
    res = transform_matches(text, r"\d+", lambda s: s[::-1])
    # print(res)     # → "abc321xyz54"   


    pattern = r"\d+"
    cleaned, log = transform_lines_and_log(poem, pattern, lambda s: f"[{s}]")

    print("=== CLEANED ===")
    print("\n".join(cleaned))
    print("=== LOG ===")
    print("\n".join(log))

