import subprocess
from typing import List, Tuple
import sys
import io
import unicodedata


"""  !!!!!  espeak-ng (приложение ws    в комстроке озвучивает как midi  всевозможные интересные примеры ???  ) 
    https://github.com/espeak-ng/espeak-ng/releases 
    графемы в фонемы (ipa)      en, de, fr, es, it,  la   ...  
 
    ??   нужно добавить словарь коррекцию   или   правила коррекции 
    FR   ç у них в проге --> k   а надо s(ss ?)    garçon 
    EN   w - у/в    water? west? 
    DE - а умляют у них в проге --> а    
    espeak          символы  лишние  или  недостающие   
    ː   \u02d0    удвоение буквы        ɜː   - изменить на ё ?
    ç           de - хь         fr - ss     ?
    w          en   у/в      ?
    проглатывание р     en de  ... ?

    (+ для др языков?)

    прогнать большие тексты чтобы выловить   дыры в карте.

    ??  не уверен что дифтонги правильно обрабатываются

    ???  в дальнейшем рассмотреть для la ...   Classical Language Toolkit (CLTK) — это библиотека для работы с классическими языками: латинский, древнегреческий, санскрит и другие.
    
    ru    (кириллицу нельзя, да и в латинице ru   не стоит)
    ʲ    - смягчение  ь ?             \u02b2   ?
"""

# Принудительный UTF-8 только там, где это имеет смысл (консоль Windows)
try:
    if hasattr(sys.stdout, "buffer"):  # обычная консоль
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
except Exception:
    pass  # в Jupyter/VSCode всё ок и так

# ----------------------------
# IPA → Кириллица (espeak-ng: en, de, fr, es, it, la)
# ----------------------------
IPA2CYR = {   # ??  возможно некоторые звуки дублируются разными символами  
    # выделить общие и уникальные звуки для разных языков   ??
    # (многосимвольные ключи в начале словаря для наглядности)
    # Дифтонги / долгие / носовые и т.д.
    "aɪ": "ай", "aʊ": "ау", "ɔɪ": "ой", "oʊ": "оу", "əʊ":"оу", "eɪ": "эй",  # "oʊ": "оу", "əʊ":"оу" дубль?
    "iː": "и", "eː": "е", "aː": "а", "ɑː": "а", "oː": "о", "uː": "у",
    "ɔː": "о", "yː": "ю",

    # Французские носовые (часто встречаются)
    "ɑ̃": "ан", "ɛ̃": "эн", "ɔ̃": "он", "œ̃": "ён",

    # Согласные (многосимвольные раньше одиночных)
    "tʃ": "ч", "dʒ": "дж", "ts": "ц", "dz": "дз",

    # Согласные (одиночные)
    "p": "п", "b": "б", "t": "т", "d": "д",
    "k": "к", "g": "г", "ɡ": "г",  # ɣ/ɡ ??  (латинская g с крючком)
    "h": "х", "ç": "хь", "x": "х", "ʔ": "", # хь/сс ??  # ʔ/ɣ/ɡ одно и тоже ?? гортанная смычка (glottal stop) 
    "f": "ф", "v": "в", "β": "в", "w": "у",  # (исп. «b» между гласными) b/v ??  #_ у/в ?? 
    "θ": "с", "ð": "з", "s": "с", "z": "з", "ʃ": "ш", "ʒ": "ж", 
    "ʁ": "р", "ɹ": "р", "ɾ": "р", "r": "р", # ɾ es  # французское ɾ/ɹ ??
    "l": "л", "ʎ": "ль", "n": "н", "ɲ": "нь", "ŋ": "нг", "m": "м",
    "j": "й", "ʝ": "й",  # исп. «y» в начале слова ??

    # Гласные
    "i": "и", "ɪ": "и",
    "e": "е", "ɛ": "е",      # э ?, э ?
    "æ": "э",                # э/я ?
    "a": "а", "ɑ": "а",
    "ʌ": "а",     # ?
    "ɜ": "а",     # ё ??   (можешь изменить на "э" при желании)
    "ɐ": "а",
    "ə": "е",     # е/а/ы ?  Шва — гласный звук среднего ряда среднего подъёма
    
    "ɒ": "о",     # из проги en  one (нужна коррекция) Moscow (латинский o с хвостом)  ??  (в IPA это открытый задний округлый гласный) (дубль?)

    "ɔ": "о", "o": "о",
    "ʊ": "у", "u": "у",
    "y": "ю", "ø": "ё", "œ": "ё",
}

# ----------------------------
# Множество "гласных" в IPA (используется для проставления "+")
# ----------------------------
IPA_VOWELS = set(list("iɪeɛæaɑʌɜɐəɔoʊuuyøœ") + ["ɑ̃", "ɔ̃", "ɛ̃", "œ̃"] + ["ɒ"]) # как с дифтонгами быть ?? 
# set тут не приведёт к ошибкам с дифтонгами, т.к. проверка идёт по символам из match 



# Подготовка отсортированного списка ключей (длинные ключи вначале)
_sorted_keys = sorted(IPA2CYR.keys(), key=len, reverse=True)


def word_to_ipa(word: str, lang: str) -> str:
    """
    Возвращает IPA строку от espeak-ng для заданного слова и кода языка.
    lang: 'en', 'de', 'fr', 'es', 'it',   'la' и т.д.
    """
    try:
        ipa = subprocess.check_output(
            ["espeak-ng", "-q", "--ipa", "-v", lang, word],
            text=True,
            encoding='utf-8'
        )
        # нормализуем Unicode (чтобы комбинированные символы были в предсказуемом виде)
        ipa = unicodedata.normalize("NFC", ipa.strip())
        return ipa
    except subprocess.CalledProcessError:
        return ""


def ipa_to_cyr(ipa: str) -> str:
    """
    Конвертирует IPA -> приближённая кириллица.
    Ударение 'ˈ' преобразуется в '+' перед первой гласной соответствующей фонеме.
    """
    if not ipa:
        return ""

    s = unicodedata.normalize("NFC", ipa)
    i = 0
    out_parts: List[str] = []
    next_stress = False
    unknown_chars = set()

    while i < len(s):
        ch = s[i]
        # основной маркер ударения
        if ch == "ˈ":
            next_stress = True
            i += 1
            continue
        # пропускаем второстепенные маркеры ударения
        if ch == "ˌ":
            i += 1
            continue
        # пробелы и пунктуацию сохраняем (если нужно)
        if ch.isspace():
            out_parts.append(ch)
            i += 1
            continue

        # ищем самое длинное соответствие из IPA2CYR
        match = None
        for k in _sorted_keys:
            if s.startswith(k, i):
                match = k
                break

        if match:
            mapped = IPA2CYR[match]
            # если ожидаем stress и в match есть гласный символ — ставим + перед mapped
            has_vowel = any((c in IPA_VOWELS) for c in match)
            if next_stress and has_vowel:
                mapped = "+" + mapped
                next_stress = False
            out_parts.append(mapped)
            i += len(match)
        else:
            # неизвестный символ — запомним и пропустим
            unknown_chars.add(s[i])
            i += 1

    # (опционально) можно вывести неизвестные символы для отладки:
    if unknown_chars:
        # выводим в stderr   ??? , чтобы основной вывод оставался чистым
        print(
            f"# Warning: unknown IPA chars: {sorted(list(unknown_chars))}", file=sys.stderr)

    return "".join(out_parts)

# ----------------------------
# сырая фунция на будущее  (для Адаптированной орфографии) вынес в .ipynb 
# сомниваюсь что она нужна 
# ----------------------------



# ----------------------------
# Тест
# ----------------------------
if __name__ == "__main__":
    tests: List[Tuple[str, str]] = [
        ("moscow", "en"),
        ("one", "en"),
        ("17er", "fr"),
        ("17º", "es"),
        ("18", "it"),
        ("17", "la"),
        ("I read books every day", "en"),
        ("I read a book yesterday", "en"),
        ("surfing", "en"),
        ("west", "en"),
        ("Mutter", "de"),
        ("ich", "de"),  # Haus  Ausländer
        ("fête", "fr"),
        ("garçon", "fr"),
        ("mater", "la"),
        ("aqua", "la"),
        ("hola", "es"),
        ("amico", "it"),
    ]

    for word, lang in tests:
        ipa = word_to_ipa(word, lang)
        translit = ipa_to_cyr(ipa)
        print(f"{lang:2} {word:12} -> IPA: {ipa} | Cyrillic: {translit}")

    # ----------------------------
    # для проверки дифтонгов (можно расширить)
    words_by_diphthong = {
        "aɪ": [
            "ice", "island",
            "time", "flight", "silent", "spider",
            "high", "sky", "fly", "cry"
        ],
        "aʊ": [
            "out", "our", "owl",
            "house", "flower", "shower", "count",
            "how", "now", "cow", "allow"
        ],
        "ɔɪ": [
            "oil", "oyster",
            "voice", "choice", "boil", "loyal",
            "boy", "toy", "enjoy"
        ],
        "oʊ": [
            "oak", "open", "only",
            "goat", "hope", "stone", "hotel",
            "go", "show", "below", "although"
        ],
        "eɪ": [
            "able", "April", "angel",
            "make", "late", "table", "rain", "pain",
            "day", "say", "away", "okay"
        ]
    }

    #  print("\n# Проверка дифтонгов:")
    for diphthong, words in words_by_diphthong.items():
        #  print(f"\n# Дифтог: {diphthong}")
        for w in words:
            ipa = word_to_ipa(w, "en")
            translit = ipa_to_cyr(ipa)
            #  print(f"  {w:10} -> IPA: {ipa:15} | Cyrillic: {translit}")
    #  print("\n# Конец теста")

    # Минимальные пары для проверки различий дифтонгов 
    minimal_pairs = [
        # /aɪ/ vs /eɪ/
        ("time", "tame"),
        ("rise", "raise"),
        ("bite", "bait"),
        ("side", "sade"),   # редкое/имя — для проверки контраста

        # /aɪ/ vs /oʊ/
        ("write", "wrote"),
        ("hide", "hoed"),
        ("mine", "moan"),
        ("fine", "phone"),

        # /aʊ/ vs /oʊ/
        ("cow", "cove"),
        ("now", "no"),
        ("loud", "load"),
        ("down", "dome"),
        ("bout", "boat"),

        # /ɔɪ/ vs /oʊ/
        ("boil", "bowl"),
        ("foil", "foal"),
        ("toil", "toll"),
        ("coin", "cone"),
        ("oil", "oh"),

        # /aɪ/ vs /ɔɪ/
        ("file", "foil"),
        ("mile", "moil"),   # устар./редкое — всё равно полезно для проверки
        ("light", "loit"),  # фамилия/редкое
    ]

    def run_minimal_pair_tests(pairs, lang="en"):
        for w1, w2 in pairs:
            ipa1 = word_to_ipa(w1, lang)
            ipa2 = word_to_ipa(w2, lang)
            tr1 = ipa_to_cyr(ipa1)
            tr2 = ipa_to_cyr(ipa2)

            print(f"{w1:12} -> IPA: {ipa1:18} | Cyr: {tr1}")
            print(f"{w2:12} -> IPA: {ipa2:18} | Cyr: {tr2}")
            print("-" * 80)
        
    #_  run_minimal_pair_tests(minimal_pairs, lang="en")


