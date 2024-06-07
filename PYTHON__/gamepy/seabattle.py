import random
# создаем поле    
field = []
for x in range(5):
    field.append(["0"] * 5)
# ВЫВОДИМ ПОЛЕ  5*5     СТРЕЛЯЕМ ввод по одной координате н/р  0 2 (верт гориз)


def print_field(field):
    for row in field:
        print(" ".join(row))


# начало игры
print("Добро пожаловать на игру Морской бой!")
print_field(field)
# рандомно задаем координаты корабля


def random_row(field):
    return random.randint(0, len(field) - 1)


def random_col(field):
    return random.randint(0, len(field[0]) - 1)


ship_row = random_row(field)
ship_col = random_col(field)
# игровой цикл
for turn in range(4):
    print("Ход", turn + 1)
    guess_row = int(input("Введите строку: "))
    guess_col = int(input("Введите колонку: "))
    if guess_row == ship_row and guess_col == ship_col:
        print("Поздравляю! Вы потопили мой корабль!")
        break
    else:
        if (guess_row < 0 or guess_row > 4) or (guess_col < 0 or guess_col > 4):
            print("Выход за пределы поля!")
        elif (field[guess_row][guess_col] == "x"):
            print("Вы уже стреляли сюда!")
        else:
            print("Вы промахнулись!")
            field[guess_row][guess_col] = "x"
    print_field(field)
    if turn == 5:            #  попытки игрока 
        print("Ваши попытки исчерпаны. Вы проиграли!")
