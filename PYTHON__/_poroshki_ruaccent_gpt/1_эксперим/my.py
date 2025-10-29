from my_ruaccent import RUAccent

acc = RUAccent()
acc.load()

text = "Все хорошо`"

print(acc.process_all(text))        # с ёфикацией (по умолчанию)
acc.disable_yo(True)                #     отключаем
print(acc.process_all(text))        # без ёфикации
acc.disable_yo(False)               #     включаем обратно
print(acc.process_all(text))        # снова с ёфикацией

with acc.no_yo():
    print(acc.process_all(text))  # временно без ёфикации
print(acc.process_all(text))   # снова с ёфикацией
 

acc2 = RUAccent(disable_yo=True)  # сразу экземпляр с отключённой ёфикацией 
acc2.load()
print(acc2.process_all("Все хорошо")) # никаких новых 'ё'

