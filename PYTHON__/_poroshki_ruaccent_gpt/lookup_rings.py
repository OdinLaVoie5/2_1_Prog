import json, gzip
from pathlib import Path
import ruaccent
from DICT_ACC_MY import DICT_ACC_MY

#   Проверка на разрывы и кольца в тексте (слова на стыке строк) 

# Загружаем базовый словарь   ?? переместить словарь в папку?  использовать другой словарь?
dict_dir = Path(ruaccent.__path__[0]) / "dictionary"
with gzip.open(dict_dir / "accents.json.gz", "rt", encoding="utf-8") as f:
    accents = json.load(f)

def lookup(word: str) -> dict | None:
    w = word.lower()
    if w in DICT_ACC_MY:     # приоритет — твой словарь
        return DICT_ACC_MY[w]
    return accents.get(w)    # иначе ищем в базовом

def lookup_rings(text: str):
    # Разбиваем на слова по стыкам строк
    lines = [ln.split() for ln in text.splitlines() if ln.strip()]
    words = [lines[i][-1] + lines[(i + 1) % len(lines)][0] for i in range(len(lines))]

    # Проверка     (добавить эвристику для искажённых слов?) ??? 
    broken_words = []
    for i, w in enumerate(words):
        found = lookup(w)
        if found:
            broken_words.append((i, w))
    
    return broken_words  
    
 

# Тест
if __name__ == "__main__":
    
    text = """я не хочу достигнуть щастья
    сметя полмира на пути
    н психоаналитик шепчет
    хоти
    """

    print(lookup_rings(text))


