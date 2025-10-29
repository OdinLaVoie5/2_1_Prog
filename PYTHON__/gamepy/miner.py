import random
# размер поля       ВЫДАЁТСЯ УЖЕ РЕШЁННОЕ ПОЛЕ 
SIZE = 10
# количество мин
MINES = 10
# инициализация игрового поля
field = [[0 for i in range(SIZE) ] for i in range(SIZE)]
# заполняем поле минами
mines_set = 0
while mines_set < MINES:
    i = random.randint(0, SIZE - 1)
    j = random.randint(0, SIZE - 1)
    if field[i][j] != -1:
        field[i][j] = -1
        mines_set += 1
# заполняем поле цифрами
for i in range(SIZE):
    for j in range(SIZE):
        if field[i][j] == 0:
            for di in range(-1, 2):
                for dj in range(-1, 2):
                    ai = i + di
                    aj = j + dj
                    # (ai, aj)
                    if 0 <= ai < SIZE and 0 <= aj < SIZE and field[ai][aj] == -1:
                        field[i][j] += 1

# выводим поле на экран
for i in range(SIZE):
    for j in range(SIZE):
        if field[i][j] == -1:
            print('*', end=' ')
        elif field[i][j] == 0:
            print('.', end=' ')
        else:
            print(field[i][j], end=' ')

    print()
