# find_abs_paths.py   поиск абсолютных путей (чтоб заменить на относительные)
import re
from pathlib import Path

# корень проекта — измени при необходимости
PROJECT_DIR = Path(r"C:\Users\Odins\new-git")
# регулярка для абсолютных путей
ABS_PATH_RE = re.compile(r'[A-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*')


# каталоги, в которые не нужно заходить
EXCLUDE_DIRS = {".venv", "__pycache__", "build", "dist"}

found = []

for pyfile in PROJECT_DIR.rglob("*.py"):
    # если путь содержит одну из исключённых папок — пропускаем
    if any(part in EXCLUDE_DIRS for part in pyfile.parts):
        continue

    try:
        text = pyfile.read_text(encoding="utf-8")
    except Exception as e:
        print(f"Ошибка чтения {pyfile}: {e}")
        continue

    for match in ABS_PATH_RE.finditer(text):
        found.append((pyfile, match.group()))

# отчёт
if found:
    print("⚠ Найдены абсолютные пути:\n")
    for f, p in found:
        print(f"{f} → {p}")
else:
    print("✅ Абсолютных путей не найдено.")
