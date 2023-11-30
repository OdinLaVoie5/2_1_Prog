import random
a = {
    "камень": "ножницы",
    "ножницы": "бумага",
    "бумага": "камень"
}





start = input(
    'Вы запустили игру "Камень, ножницы, бумага". Хотите поиграть? (Вводите + или -): ')

if start == '+':
    print('Загрузка...')
    print("Загрузка завершена! Начинаем!")
    print("3...2...1...")
    print('Если захотите закончить вводите "-".')
    print('Если захотите узнать счёт вводите "с".')
    user_ball = 0
    rand_ball = 0
    while True:
        user = input("Камень, ножницы или бумага? (Вводите к, н или б): ")
        list_play = ['к', 'н', 'б']
        if user in list_play:
            rand = random.choice(list_play)
            print(rand)

            if rand == 'к' and user == 'н':
                rand_ball += 1
            if rand == 'к' and user == 'б':
                user_ball += 1
            if rand == 'н' and user == 'к':
                user_ball += 1
            if rand == 'н' and user == 'б':
                rand_ball += 1
            if rand == 'б' and user == 'н':
                user_ball += 1
            if rand == 'б' and user == 'к':
                rand_ball += 1
        elif user == 'с':
            print('Ваши баллы - ', user_ball,
                  '. Баллы вашего соперника - ', rand_ball, ".")
        elif user == '-':
            print('Ваши баллы - ', user_ball,
                  '. Баллы вашего соперника - ', rand_ball, ".")
            print('Конец игры! Заходите ещё!')
            break
        else:
            print('Вводите к, н или б')


if start == '-':
    print('Жаль... :(')
else:
    print('Простите, я вас не понял, если хотите играть перезапустите программу и введите "+". Спасибо!')


#      РАСШИРЕННЫЙ ВАРИАНТ 
#  a = [
#      "ножницы:бумага",
#      "бумага:камень",
#      "камень:ящерица",
#      "ящерица:Спок",
#      "Спок:ножницы",
#      "ножницы:ящерица",
#      "ящерица:бумага",
#      "бумага:спок",
#      "Спок:камень",
#      "камень:ножницы"
#  ]

#  ???   (( некое упрощение чтобы избежать переборы ))
#  while True:
#      b = input("Игрок 1: ")
#      c = input("Игрок 2: ")
#  
#      if b == c:
#          print("ничья")
#          continue
#      for i, j in a.items():
#          if b == i and c == j:
#              print("Победил Игрок 1")
#              break
#          elif c == i and b == j:
#              print("Победил Игрок 2")
#              break
#  
