# DSL  спец текстовые языки ((самодельные,  под свои нужды))  очень интересно но нихера не понятно
from textx import metamodel_from_str, get_children_of_type

grammar = """
Model: commands*=DrawCommand;
DrawCommand: MoveCommand | ShapeCommand;
ShapeCommand: LineTo | Circle;
MoveCommand: MoveTo | MoveBy;
MoveTo: 'move' 'to' position=Point;
MoveBy: 'move' 'by' vector=Point;
Circle: 'circle' radius=INT;
LineTo: 'line' 'to' point=Point;
Point: x=INT ',' y=INT;
"""

# Предоставим свой класс для Point.
# Классы для других правил будут динамически созданы.


class Point:
    def __init__(self, parent, x, y):
        self.parent = parent
        self.x = x
        self.y = y

    def __str__(self):
        return "{},{}".format(self.x, self.y)

    def __add__(self, other):
        return Point(self.parent, self.x + other.x, self.y + other.y)


# Создадим мета-модель на основе грамматики.
# Предоставим класс Point для правила Point из грамматики.
mm = metamodel_from_str(grammar, classes=[Point])

model_str = """
    move to 5, 10
    line to 10, 10
    line to 20, 20
    move by 5, -7
    circle 10
    line to 10, 10
"""

# Мета-модель знает, как разбирать и создавать экземпляры моделей.
model = mm.model_from_str(model_str)

# В этот момент модель – это обычный объект Python с экземплярами динамически созданных классов и атрибутов, соответствующих грамматике.


def cname(o):
    return o.__class__.__name__


# Давайте интерпретируем модель
position = Point(None, 0, 0)
for command in model.commands:
    if cname(command) == 'MoveTo':
        print('Перемещение в позицию', command.position)
        position = command.position
    elif cname(command) == 'MoveBy':
        position = position + command.vector
        print('Перемещение на', command.vector, 'в новую позицию', position)
    elif cname(command) == 'Circle':
        print('Рисуем круг в', position, 'с радиусом', command.radius)
    else:
        print('Рисуем линию от', position, 'до', command.point)
        position = command.point
    print('Конечная позиция', position)

# Вывод:
# Перемещение в позицию 5,10
# Рисуем линию от 5,10 до 10,10
# Рисуем линию от 10,10 до 20,
