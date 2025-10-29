import re
# вариант сортировки и трансформации (в частности очистки) текста (не построчно) 


# === Заглушки для спец-функций ===
def num2words_stub(num_str):
    return f"<{num_str}_NUM>"

def translit_stub(word):
    return f"<{word}_LAT>"

# === Токенайзер (универсальный) ===
regex_tokenizer = re.compile(
    r"\d+|"                # цифры
    r"[a-zA-Z]+|"          # латиница
    r"[а-яА-ЯёЁ]+|"        # кириллица
    r"[.,!?;:\-–()«»\"'…]|"  # препинаки
    r"[^\w\s]",            # прочий мусор
    flags=re.UNICODE
)

# === Обработчики ===
def handle_token(token, log):
    if token.isdigit():
        log.append(("DIGIT", token))
        return num2words_stub(token)

    elif re.match(r"^[A-Za-z]+$", token):
        log.append(("LATIN", token))
        return translit_stub(token)

    elif re.match(r"^[а-яА-ЯёЁ]+$", token):
        return token  # норм, оставляем

    elif re.match(r"^[.,!?;:\-–()«»\"'…]+$", token):
        log.append(("PUNCT", token))
        return token  # можно удалять, если не нужно

    else:
        log.append(("GARBAGE", token))
        return ""  # выкидываем

# === Основная функция ===
def clean_text(text):
    tokens = regex_tokenizer.findall(text)
    log = []

    cleaned = [handle_token(t, log) for t in tokens]
    # Собираем обратно, убирая лишние пробелы
    result = " ".join([t for t in cleaned if t]).replace(" ,", ",").replace(" .", ".")

    return result.strip(), log

# === Пример использования ===
if __name__ == "__main__":
    poem = """
    мне 125 лет, wifi не ловит —
    но я спокоен... 😎
    """
    cleaned, log = clean_text(poem)

    print("=== CLEANED TEXT ===")
    print(cleaned)
    print("\n=== LOG ===")
    for entry in log:
        print(f"{entry[0]:<10} {entry[1]}")
