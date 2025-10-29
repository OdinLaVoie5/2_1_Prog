# gpt_poroshki.py
import re
import os
from analyze_poem import analyze_poem

#__   использует analyze_poem.py  (пакеты transformers datasets accelerate ruaccent ... )

""" 
1. Нормализация подписей (© + перенос → © Автор).
2. Разделение порошков по подписям.
3. Очистка и фильтрация множества порошков. (использует analyze_poem.py)
4. Сохранение чистых порошков (и др) в файл.
"""

base_dir = os.path.dirname(__file__)
input_file = os.path.join(base_dir, "poroshki.txt")
# input_file = "poroshki.txt"   # должен содержать только подписанные порошки 
# (дополнительно: если вдруг есть неподписанные - дополнительно сплит блока по пустой строке ?? ... )
clean_file = os.path.join(base_dir, "poroshki_clean.txt")
# clean_file = "poroshki_clean.txt"  # сохранение чистых порошков
#  сделать по флагу сохранение в разном виде в отдельные файлы (с подписями, с надписями и подписями  ...)
#  ??? сделать файл сохранение брака (+ указать какой брак)


SIGNATURE_MARKERS = ["©", "(C)", "(c)", "(С)", "(с)"]
SPLIT_MARKER = "<<<SPLIT>>>" 

# читаем файл
with open(input_file, "r", encoding="utf-8") as f:
    text = f.read()

# --- НОРМАЛИЗАЦИЯ ПОДПИСЕЙ ---

# 1. Склеиваем "©" и имя автора (учитываем пробелы/табы/пустые строки между ними)
text = re.sub(r"^[ \t]*(©)\s*\n\s*", r"\1 ", text, flags=re.MULTILINE)

# 2. Присоединяем рейтинг после подписи (© Автор → © Автор 123)
#    допускаем пробелы/табы/пустые строки перед числом
text = re.sub(r"([ \t]*©[^\n]+?)\s*\n\s*([0-9]+)", r"\1 \2", text)

# --- РАЗДЕЛЕНИЕ ПО ПОДПИСЯМ ---

# ищем строки, начинающиеся с маркера (©, (C), ...)
pattern = r"^[ \t]*(?:" + "|".join(re.escape(m)
                                   for m in SIGNATURE_MARKERS) + r").*$"


def add_split_marker(match):
    return match.group(0) + " " + SPLIT_MARKER


# вставляем маркер
text_marked = re.sub(pattern, add_split_marker, text, flags=re.MULTILINE)

# получаем список порошков
#  ??? Что делать если очень много порошков? (память. файл)
raw_poems = [p for p in text_marked.split(SPLIT_MARKER) if p.strip()]


# применяем очистку ко всем порошкам
cleaned_poems = []
for p in raw_poems:
    c = analyze_poem(p)
    if c:
        cleaned_poems.append(c)


print(cleaned_poems)
