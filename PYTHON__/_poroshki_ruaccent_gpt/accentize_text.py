# accentize_text.py
import os
# в my_ruaccent я отключил ёфиксацию  
from my_ruaccent import RUAccent
# Импортируем мой словарь ударений. Если словарь большой — лучше грузить из JSON/TSV, но для примера держим небольшой.
from DICT_ACC_MY import DICT_ACC_MY


def custom_dict_postprocess(processed_text: str, custom_dict: dict[str, str]) -> tuple:
    words = processed_text.split()
    changes = []

    for i, w in enumerate(words):
        if "+" not in w:
            key = w
            if (key in custom_dict) and ("+" in custom_dict[key]):   #  только если для слова есть "+" в custom_dict
                new_word = custom_dict[key]
                words[i] = new_word
                changes.append((i, new_word))

    return " ".join(words), changes

# функция не модифицирует исходный text. Она возвращает предполагаемые ударения и слова оставшееся без ударения.   доработать ??
def complex_words_postprocess(processed_text: str, accentizer: RUAccent) :
    """
    Обрабатывает слова, которые не получили ударений:
      1) пробуем «подрезку» слова от начала (cut-rule),
      2) если всё ещё нет — ставим '+' перед 'ё' (yo-rule).
    Возвращает (обновлённый текст, список изменений).
    """
    vowels = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"
    words = processed_text.split()
    post_changes = []
    rest = []
    saved = {}
    
    for i, w in enumerate(words):
        # пропускаем: односложные или уже с "+"
        if sum(ch in vowels for ch in w) <= 1 or "+" in w:
            continue

        # --- 1. cut-rule ---
        applied = False
        # добавить эвристику отрезая от конца до 5 букв ??  (окончания)
        for j in range(min(7, max(0, len(w) - 3))): # ?? не оставлять коротких обрезков-слов и не брать много с начала
            cut_w = w[j:]  # вроде начинает с нуля (прогоняет целое слово и иногда получает ударения н/р зелёносиним -> зел?ёнос?иним)
            acc_cut_w = accentizer.process_all(cut_w)
            if "+" in acc_cut_w:
                new_w = w[:j] + acc_cut_w.replace("+", "?")
                post_changes.append((i, new_w, acc_cut_w, "cut"))
                saved[w] = new_w   # v   слова получившие предположительное ударение  "?"  
                applied = True
                break

        if applied:
            continue

        # --- 2. ё-rule ---
        if "ё" in w:
            new_w = w.replace("ё", "?ё")     # отмечаем все ё
            post_changes.append((i, new_w, "yo"))
            saved[w] = new_w      # ^   слова получившие предположительное ударение  "?"    
        else: 
            rest.append(w)        #    слова оставшиеся без "+"   
            saved[w] = w          #    всё вместе
    return post_changes, rest, saved


# UTIL  сохранение слов оказавшихся без ударения в словарь в файл DICT_ACC_MY.py
# можно напрямую пополнять   н/р   update_dict_acc({"солнце": "с+олнце"})
def update_dict_acc(new_entries: dict, filename: str = "DICT_ACC_MY.py"):
    """
    Обновляет словарь в той же папке, где находится этот файл (с функцией).
    - checked (с '+') сортируются и идут сверху
    - unchecked (без '+') остаются в порядке добавления
    - новые слова не дублируются
    """
    # путь именно к папке, где лежит этот файл (а не тот, откуда запуск)
    base_dir = os.path.dirname(__file__)
    filepath = os.path.join(base_dir, filename)

    current_dict = {}
    if os.path.exists(filepath):
        try:
            namespace = {}
            with open(filepath, "r", encoding="utf-8") as f:
                code = f.read()
            exec(code, namespace)
            if "DICT_ACC_MY" in namespace and isinstance(namespace["DICT_ACC_MY"], dict):
                current_dict = namespace["DICT_ACC_MY"]
        except Exception as e:
            print(f"[WARN] Не удалось загрузить {filepath}: {e}")

    # разделяем на checked/unchecked
    checked = {k: v for k, v in current_dict.items() if "+" in v}
    unchecked = {k: v for k, v in current_dict.items() if "+" not in v}

    # добавляем новые только если их ещё нет
    actually_added = []
    for k, v in new_entries.items():
        if k not in checked and k not in unchecked:
            unchecked[k] = v
            actually_added.append(k)

    # пишем файл
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("DICT_ACC_MY = {\n")

        # checked — сортируем по ключам
        for k in sorted(checked):
            f.write(f'    "{k}": "{checked[k]}",\n')

        if unchecked:
            f.write("\n\n\n")  # разделитель
            # unchecked — как добавлялись
            for k, v in unchecked.items():
                f.write(f'    "{k}": "{v}",\n')

        f.write("}\n")

    # лог
    if actually_added:
        print(f"[INFO] Всего слов без ударений: {len(new_entries)}. Новых слов: {len(actually_added)}. Помещены в {filepath}.")
    else:
        print(f"[INFO] Всего слов без ударений: {len(new_entries)}. Новых слов не найдено. Словарь в {filepath}.")


# ----- ОСНОВНАЯ ФУНКЦИЯ ----
def accentize_text(
    text: str,
    accentizer = None,   
    use_manual: bool = True,              # восстанавливать ручные '+'
    custom_dict = None,  # None->загрузить дефолт, {}->выключить словарь
    complex_words = True,   #False    
    bypass_ruaccent: bool = False,        # не трогать ruaccent вообще
    debug: bool = False      # True 
) -> str:
   
    # ----- 1. словарь -----
    if custom_dict is None:
        custom_dict = dict(DICT_ACC_MY)     # независимая копия словаря
        if debug:
            print("[DEBUG] custom_dict=None -> загружен словарь из DICT_ACC_MY (копия)")
    elif custom_dict == {}:
        custom_dict = None
        if debug:
            print("[DEBUG] custom_dict={} -> словарь отключён")

    # ----- 2. accentizer -----
    if not bypass_ruaccent and accentizer is None:
        accentizer = RUAccent()
        accentizer.load(omograph_model_size='big_poetry',
                use_dictionary=True, tiny_mode=False)  
        if debug: print("[DEBUG] accentizer=None -> загружен accentizer по умолчанию")

    # ----- 3. определение ручных акцентов '+' -----
    words = text.split()
    manual_accents = []
    clean_text = text
    if use_manual:
        manual_accents = [(i, w) for i, w in enumerate(words) if "+" in w]
        clean_text = clean_text.replace("+", "")
        if debug and manual_accents:
            print(f"[DEBUG] Найдено {len(manual_accents)} слов с ручными акцентами")
    else: clean_text = clean_text.replace("+", "")

    # ----- 4. ruaccent или bypass -----
    if bypass_ruaccent:
        processed = clean_text
        if debug: print("[DEBUG] bypass_ruaccent=True -> не вызываем ruaccent")
    else:     
        processed = accentizer.process_all(clean_text)  # здесь можно бы функцию _safe_process если текст слишком длинный (разбить на чанки). 
        if debug: print("[DEBUG] Запущен accentizer.process_all(clean_text) c чанкингом")

    # ----- 5. восстановление ручных '+' -----
    """gc
    Восстановление ручных акцентов может ломаться, если порядок слов изменился после обработки (например, если ruaccent разбил текст по-другому ((не должен))).
    Лучше восстанавливать акценты по совпадению слов, а не по индексу. ((здесь тоже сложность - может быть несколько одинаковых слов возможно омографов. решаемо)) ??
    """
    if manual_accents:
        processed_words = processed.split()
        for idx, manual_word in manual_accents:
            if idx < len(processed_words):
                processed_words[idx] = manual_word
        processed = " ".join(processed_words)
        if debug: 
            print("[DEBUG] Ручные акценты восстановлены")
            print(manual_accents)

    # ----- 6. постобработка словарём -----
    if custom_dict:
        processed, changes = custom_dict_postprocess(processed, custom_dict)
        if debug:
            print(f"[DEBUG] Применён custom_dict. {len(changes) or "0"} замен.")
            if changes:
                print(changes)

    # ----- 7. постобработка (эвристика на сложные слова и "ё") ----- 
    if complex_words and not bypass_ruaccent:
        post_changes, rest, saved = complex_words_postprocess(processed, accentizer)
        if debug:
            print(f"[DEBUG] Применён complex_words. {len(post_changes) or "0"} предположений.")
            if post_changes: print(post_changes)    # показать слова с предположительными ударениями (и тип эвристики)  
            if rest: print(saved)                   # показать слова оставшиеся совсем без ударений

    # ------    обновляем словарь 
    if saved: update_dict_acc(saved)                # ^  и те и длугие сохраняем в словарь  

    return processed




if __name__ == "__main__":
    text = """ мне семь мне десять мне пятнадцать
мне двадцать три мне тридцать пять
не всем дневник минималиста
понять
"""


    print(accentize_text(text, debug=True))
