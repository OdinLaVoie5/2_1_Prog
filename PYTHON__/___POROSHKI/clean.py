# clean  для  analyze_poem        УТИЛИТЫ ОЧИСТКИ ... 
import re

# в конце  clean_cyr_word   normalize_text  ... ...


# --- Разрешённые внутренние символы ---
ALLOWED_CHARS = "+*^"    

# --- Заглушки спец-функций ---
def num2words_stub(num_str):
    return ""               # f"<{num_str}_NUM>"

def translit_stub(word):
    return ""               # f"<{word}_LAT>"


# ??? ОФОРМИТЬ КАК ФУНКЦИЮ ИЛИ КЛАСС 

# --- Регулярки ---           
# !!!! знаки пунктуации ...      см https://ru.piliapp.com/symbol/
PUNCTUATION = r".,!?;:\-‐–—−()«»\'′’ʼʹ‘\"“…"   # ’ʼʹ ??? найти пары для “‘
SPETIAL_SYMBOLS = r"/*+%#@¿¡№$€£¥°℃Å℉©®™§%^&*_=<>⟨⟩[]{}|\\~`"  # ?  ¢₹   ₩₪₫₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿"    ↑↓←→  ?  блин - так придётся добавить пункт "научные" знаки ... ... )

regex_tokenizer = re.compile(
    rf"""
    \s+ |         # пробелы и переносы (оставляю в handle_token как есть)
    \d+ |         # цифры
    [A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ]+(?:[-'{re.escape(ALLOWED_CHARS)}][A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ]+)* |    # ?? не будет проблем с a-ha    латиница с ALLOWED_CHARS (+*^) внутри  # латиница и особые буквы немецкого, французского, испанского, итальянского ...
    [а-яА-ЯёЁ]+(?:[-'{re.escape(ALLOWED_CHARS)}][а-яА-ЯёЁ]+)* |  # кириллица с ALLOWED_CHARS (+*^) внутри   #  и выделяю дефис (и ') в середине слова (и в handle_token тоже) т.к. дефис (и ') неотъемлимая часть многих слов (и в латинице тоже)
    [{re.escape(PUNCTUATION)}]+ |         # пунктуация
    [{re.escape(SPETIAL_SYMBOLS)}]+ |     # особые символы
    [^\w\s]         # мусор    (? ещё есть диакритика - это не отдельные символы, а наборы)
    #  украинские не поймались и ѣ ( ?? похоже нужно ещё группу - буквы но не cyr и не lat) 
    """,
    flags=re.UNICODE | re.VERBOSE
)

# --- Обработка одного токена ---      спец-функции корректируются при надобности в ручную ?
# !!!  КОНЦЕПЦИЯ (может измениться): убрать всё кроме букв, (дефисов в словах), пробелов и рабочих символов (предупреждая об удалённом в логе)
def handle_token(token, allowed_chars=ALLOWED_CHARS):   # передаётся allowed_chars
    if token.isspace():
        return token, None  # оставляю как есть (нормализуется после gpt_poroshki)   # вариант лишние пробелы   token, "SPACE" if len(token) > 1 else None    # не изменять. если >1 то логируем 

    elif all(ch in allowed_chars for ch in token):
        # Если токен состоит только из разрешённых символов (например "++" или "^") пропускаем
        return token, None

    elif token.isdigit(): 
        return num2words_stub(token), "DIGIT"

    elif re.match(rf"^[A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ]+(?:[-'{re.escape(allowed_chars)}][A-Za-zÀ-ÖØ-öø-ÿĀ-žḀ-ỿ]+)*$", token):
        return translit_stub(token), "LATIN"  # рабочие символы включаем в латиницу

    elif re.match(rf"^[а-яА-ЯёЁ]+(?:[-'{re.escape(allowed_chars)}][а-яА-ЯёЁ]+)*$", token):
        return token, None  # кириллицу (сейчас) не трогаем  (# возможно понадобится трансформация и логирование кириллицы)   
    # рабочие символы включаем в кириллицу

    elif re.match(rf"^[{re.escape(PUNCTUATION)}]+$", token): # пунктуация- логировать или не логировать - вот в чём вопрос 
        return "", "PUNCT"   #token , None    

    elif re.match(rf"^[{re.escape(SPETIAL_SYMBOLS)}]+$", token):
        return "", "SPETIAL"    #token  , None    

    else:
        return "", "GARBAGE"   #token  , None


#          ГЛАВНАЯ ФУНКЦИЯ
# --- Построчная обработка с логом ---
def clean_lines_with_log(lines: list[str], log_blocks=None):
    if isinstance(lines, str):
        lines = lines.splitlines() # если текст, то делаем список строк

    result_lines = []

    log_blocks = log_blocks or {   # подавать лэйблы-группировки как аргумент функции (по умолчанию None) или убрать это ?   излишнее?
        "SPACE": ["SPACE"],
        "DIGIT": ["=== DIGIT ==="],  #  "=== LATINS AND DIGITS ===:" варианты
        "LATIN": ["=== LATIN ==="],  #  "=== LATINS AND DIGITS ===:" 
        "PUNCT": ["PUNCT"],
        "SPETIAL": ["SPETIAL"],
        "GARBAGE": ["GARBAGE"]       #  "<<< STRANGE_SYMBOLS >>>:"
    }

    # нормализация апострофов, дефисов (до того как их почистит clean_lines_with_log)  
    # и повторов гласных 
    norm_lines = [collapse_long_vowels(normal_apostrophe(line)) for line in lines]

    for i, line in enumerate(norm_lines, start=1):
        new_tokens = []
        local_changes = {k: [] for k in log_blocks}

        for m in regex_tokenizer.finditer(line):
            tok = m.group()
            pos = m.start()    # индекс в строке для текста на входе (в конечном итоге может измениться )
            new_tok, kind = handle_token(tok, ALLOWED_CHARS)
            if kind:
                local_changes[kind].append((tok, new_tok, pos))
            new_tokens.append(new_tok)

        new_line = "".join(t for t in new_tokens if t)
        result_lines.append(new_line)

        for kind, changes in local_changes.items():
            for old, new, pos in changes:
                log_blocks[kind].append(f"{i} line [{pos}]: '{old}' → '{new}'")

    # убираем пустые категории
    """   # внутри log_symbols  список списков .  это должно состыковаться с analyze_poem 
        [
            ["<<< DIGIT >>>", "1 line: '123' → '<123_NUM>'", "2 line: '42' → '<42_NUM>'"],
            ["<<< LATIN >>>", "1 line: 'wifi' → '<wifi_LAT>'"]
        ]
    """
    log_symbols = [lines for lines in log_blocks.values() if len(lines) > 1]
    return result_lines, log_symbols



# --- нормализация дефисов и апострофов ---      
def normal_apostrophe(text: str) -> str: 
    """Нормализует дефисы и апострофы к стандартным формам""" 
    text = re.sub(r"[‐–—−]", "-", text) # все виды дефисов → "-" 
    text = re.sub(r"[`′’ʼʹ‘]", "'", text) # все виды апострофов → "'" 
    return text

# --- очистка кириллицы от посторонних символов --- 
#     по умолчанию оставляем дефис и апостроф
def clean_cyr_word(word: str, allowed_chars=ALLOWED_CHARS, add: str | None = None) -> str:
    """
    Удаляет из слова все символы, кроме кириллицы, указанных в add и разрешённых знаков.
    """
    if add is None:
        add = "-'"  # по умолчанию дефис и апостроф

    add_escaped = re.escape(add)
    pattern = rf"[^а-яА-ЯёЁ{add_escaped}{re.escape(allowed_chars)}]"
    cleaned = re.sub(pattern, "", word)
    cleaned = re.sub(rf"(^[{add_escaped}]|[{add_escaped}]$)", "", cleaned)
    return cleaned


def collapse_long_vowels(text: str) -> str:
    """Схлопывает 4 и более одинаковых кириллических гласных подряд в одну."""
    vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
    pattern = re.compile(fr"([{vowels}])\1{{2,}}", flags=re.IGNORECASE)  # 1 гласная + 3+ тех же подряд Аааа  ?? поставил {2,} ?   но - ООО  длинношеее
    return pattern.sub(r"\1", text)



# нормализация текста в виде списка строк
def normalize_text(lines: list[str]|str) -> list[str]:
    """
    Нормализует список строк:
      1. Убирает пустые строки, табы, пробелы по краям и лишние пробелы.
      2. Переводит всё в нижний регистр.
    """
    if isinstance(lines, str):
        lines = lines.splitlines()

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



# --- Пример ---
if __name__ == "__main__":
    poem = """'мале'вич курит пахитоску
витают - в воздухе ! клубы
по большей части образуя
кубы- """

    # cleaned, log_symbols = clean_lines_with_log(poem)

    # print("=== CLEANED TEXT ===")
    # print(cleaned)

    # print("\n=== LOG SYMBOLS ===")
    # for block in log_symbols:
        # print("\n".join(block))
        # print()


    f = clean_cyr_word(poem, add="\n ")
    print(f)
