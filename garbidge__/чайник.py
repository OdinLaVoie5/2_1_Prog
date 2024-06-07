room_temp = 20  # Задаём комнатную температуру воды.


def boil(water_temp):
    while water_temp < 100:  # Пока температура воды меньше 100°C,
        water_temp = water_temp + 10  # нагреваем воду на 10°C.
        # Выводим текущую температуру.
        print('TEMPERATURE', water_temp, '°C')
    else:
        # Выводим сообщение «Чайник закипел!».
        print('YES!')


# А теперь запустим функцию.
boil(room_temp)


right_password = '1234'


def check_pass(password):
    if password == right_password:
        print('Пароль', password, '- верный. Сигнализация отключена.')
    else:
        print('Сработала сигнализация!')


# Попробуем ввести правильный пароль.
check_pass('1234')

# А теперь к нам пытается пробраться чужак.
check_pass('5432')



