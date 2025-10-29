# gpt_poroshki        СОРТИРОВКА И ЗАПИСЬ        КОНВЕЙЕР 
import re, json,  os
from pathlib import Path
from analyze_poem import analyze_poem
from clean import normalize_text, clean_cyr_word

 
# использует analyze_poem.py  (??? пакеты transformers datasets accelerate  )
# processor = normalize_text    # назначает функцию для конечной очистки (отбракованные не нормализуются)

""" 
1. Нормализация подписей (© + перенос → © Автор).
2. Разделение порошков по подписям.
3. Очистка и фильтрация множества порошков. (использует analyze_poem.py)
4. Сохранение чистых порошков (и др) в файл.
"""

base_dir = Path(__file__).parent
input_file = base_dir / "poroshki.txt"
clean_file = base_dir / "poroshki_clean.txt"
fail_file = base_dir / "poroshki_fail.txt"
unknown_file = base_dir / "unknown_words.json"
#  сделать по флагу сохранение в разном виде в отдельные файлы (с подписями, с надписями и подписями  ...)



SIGNATURE_MARKERS = ["©", "(C)", "(c)", "(С)", "(с)"]
SPLIT_MARKER = "<<<SPLIT>>>" 

# читаем файл
with open(input_file, "r", encoding="utf-8") as f:
    text = f.read()      # ?? если большой файл - разбить на части?

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
raw_poems = [p for p in text_marked.split(SPLIT_MARKER) if p.strip()]


# ПРИМЕНЯЕМ ОЧИСТКУ И ФИЛЬТРАЦИЮ КО ВСЕМ ПОРОШКАМ
cleaned_poems = []     # ???  пускай будут повторы (unique не надо)
failed_poems = []
unknown_words = {}
for f in raw_poems:
    ok, c, a, r, final_log, log_acc = analyze_poem(f) # True/False  cleaned accented raw ...
    if log_acc:
        for l in log_acc:
            if isinstance(l, str):
                unknown_words[l] = l  # дубли не страшны — словарь сам уберёт
    if ok:    
        cleaned_poems.append(c)  
        # если нужно убрать дубликаты v
        # unique_poems = list(dict.fromkeys(cleaned_poems))       
    else:     
        failed_poems.append([final_log, r, a])   

print(f"Исходных порошков: {len(raw_poems)}")
print(f"Отборных порошков: {len(cleaned_poems)}")  
print(f"Файл сохранён в: {os.path.abspath(clean_file)}")

"""отладка 
print("===================================")
print("===================================")
for c in cleaned_poems:
    print(c, end="\n\n")
print("===================================")
print("===================================")
for f in failed_poems:
    for l in f[0]:
        for s in l:
            print(s)
    print("..............")
    print(f[1])
    print("..............")
    print(f[2])
    print("..............")
    print("\n\n")"""

 

# =============================================
# СОХРАНЕНИЕ cleaned_poems и failed_poems для следующего этапа
# в отдельные файлы   poroshki_clean.txt  и  poroshki_fail.txt
# CLEANED_POEMS  НОРМИРОВАНО и ТОЛЬКО КИРИЛЛИЦА
with open(clean_file, "w", encoding="utf-8") as f:
    for poem in cleaned_poems:
        poem = clean_cyr_word(poem, add="\n ")
        poem = normalize_text(poem)
        f.write(("\n").join(poem))    
        f.write("\n\n")

with open(fail_file, "w", encoding="utf-8") as f:
    for fpoem in failed_poems:
        final_log, raw, accented = fpoem

        # лог (многоуровневый список строк)
        for l in final_log:
            for s in l:
                f.write(f"{s}\n")
        f.write("..............\n")

        # сырой текст
        f.write(f"{raw.strip()}\n")
        f.write("..............\n")

        # акцентированный текст
        f.write(f"{accented.strip()}\n")
        f.write("..............\n\n\n")


# и СОХРАНЕНИЕ НЕЗНАКОМЫХ СЛОВ
# 1. читаем, если файл есть
if unknown_file.exists():
    with open(unknown_file, "r", encoding="utf-8") as f:
        try:
            old_unknown = json.load(f)
        except json.JSONDecodeError:
            old_unknown = {}
else:
    old_unknown = {}

# 2. объединяем с новыми словами
# (у тебя unknown_words — это словарь вида {w: w})
old_unknown.update(unknown_words)

# 3. сохраняем обратно
with open(unknown_file, "w", encoding="utf-8") as f:
    json.dump(old_unknown, f, ensure_ascii=False, indent=2)




