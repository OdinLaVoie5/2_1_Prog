# accentize_text  для  analyze_poem        РАССТАНОВКА УДАРЕНИЯ
import json, re
from pathlib import Path
from clean import clean_cyr_word, normal_apostrophe, ALLOWED_CHARS


"""
Расстанавливает ударения в тексте используя словари.
Возвращает текст с ударениями (плюс перед ударной гласной) или None, если не удалось расставить все ударения (изменить?).
Дополнительно - проверяет текст на разрывы слов и кольца (слова на стыке строк).
Использует словари из папки DICTS. 
"""


# --- загрузка словарей ---
base_dir = Path(__file__).resolve().parent.parent  # этаж выше
dicts_dir = base_dir / "DICTS"

def load_json(name: str) -> dict:
    path = dicts_dir / name
    if path.exists():
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    return {}

OMO = load_json("omographs.json")
ACC = load_json("accents.json")
NEW = load_json("new_dict.json")  # сюда же в ручную добавлять свои слова (в т.ч. с безударными "ё")   из unknown_words.json
# см ещё invers.txt ?? (рифмы?)


#          ГЛАВНАЯ ФУНКЦИЯ
# --- расстановка ударений по словарям ---
def accentize_text(lines: list[str]):
    if isinstance(lines, str):
        lines = lines.splitlines() # если текст, то делаем список строк
    
    log_acc = []

    def accentize_line(line: str) -> tuple[str, list[str]]:
        rez_line = []

        vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
        sign = "^"   # для чередования знаков омографов

        for word in line.split():
            word = normal_apostrophe(word)  # нормализация дефисов и апострофов (дублируется для местного использования)
            word = clean_cyr_word(word)     # убираем лишние символы (если вдруг остались)
            if sum(c in vowels for c in word) < 2: # слово без гласных и с одной гласной - пропускаем   ??
                rez_line.append(word)
                continue

            flag = False
            for ch in ALLOWED_CHARS:  
                if ch in word:       # пропускаем слова с ALLOWED_CHARS 
                    rez_line.append(word)
                    flag = True
                    break
            if flag:
                continue


            # Поиск в omographs       
            if word in OMO:
                if sign=="^": sign="*"
                else: sign="^"
                variants = OMO[word]
                # Собираем все ударные позиции
                positions = set()
                for v in variants:
                    for m in re.finditer(r"\+", v):
                        positions.add(m.start())

                # Убираем все плюсы и восстанавливаем слово
                base = re.sub(r"\+", "", variants[0])
                chars = list(base)
                for i in positions:
                    if i < len(chars):
                        chars[i] = sign + chars[i]
                rez_line.append("".join(chars))
                continue 

            # Поиск в accents
            if word in ACC:
                rez_line.append(ACC[word])
                continue

            # Поиск в new_dict
            if word in NEW:
                rez_line.append(NEW[word])
                continue

            # Обработка "ё"
            if word.count("ё") == 1:
                rez_line.append(word.replace("ё", "+ё"))
            # если несколько "ё" - ударение на последнюю  ?? 
            elif word.count("ё") > 1:
                last_index = word.rfind("ё")
                rez_line.append(word[:last_index] + "+ё" + word[last_index+1:])
            else:          # ??? сделать эвристику для неизвестных слов с рекурсией? см
                rez_line.append(word)
                if not log_acc: log_acc.append("=== UNKNOWN WORDS ===")
                log_acc.append(word)

        return (" ".join(rez_line))
    

    accented_lines = []
    for line in lines:
        accented_lines.append(accentize_line(line))

    return accented_lines, log_acc 



#  дополнительно  проверка на разрывы и кольца в тексте (слова на стыке строк) 
def lookup(word: str):
    w = word.lower()
    # Поиск в omographs 
    if w in OMO:
        return True
    # Поиск в accents
    if w in ACC:
        return True
    # Поиск в new_dict
    if w in NEW:
        return True
    return False

def lookup_rings(lines: list):
    # если пришёл обычный текст, а не список строк — разбиваем его на строки
    if isinstance(lines, str):
        lines = lines.splitlines()

    # Разбиваем на слова по стыкам строк
    split_lines = [ln.split() for ln in lines if ln.strip()]
    words = [split_lines[i][-1] + split_lines[(i + 1) % len(split_lines)][0] for i in range(len(split_lines))]

    # Проверка     (добавить эвристику для искажённых слов?) ??? 
    broken_words = []
    for i, w in enumerate(words):
        found = lookup(w)
        if found:
            if not broken_words: broken_words.append("------- BROKEN WORDS -------")
            broken_words.append((i, w))
    
    return broken_words  
    
    
# Тест
if __name__ == "__main__":
    text = """я не хочу до`стигну`ть щастья
сметя полмира на пути
н психоаналитик шепчет
хоти"""
    out = accentize_text(text)
    print(out[0])
    print(out[1])

    print("-----------")
    text = """я не хочу до'стигнуть `щастья`
сметя полмира на пути
н психоаналитик шепчет
хоти"""
    out = lookup_rings(text)
    # print(out)
