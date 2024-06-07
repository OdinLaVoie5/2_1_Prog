import turtle



# Создаем объект turtle
pen = turtle.Turtle()

#      моё
for i in range(4):
    for _ in range(7):
        pen.forward(100)  # идем вперед на 100 пикселей
        pen.right(360/7)  # поворачиваем на 90 градусов
    pen.right(720/7)  # поворачиваем на 90 градусов


# Закрываем окно при клике на него
turtle.exitonclick()




