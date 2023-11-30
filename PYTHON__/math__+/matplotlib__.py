import matplotlib.pyplot as plt
import numpy as np

#     (( аппроксимация ??    прямая линия между данными точками  ))
def calculate_best_fit_line(x, y):
    # Perform linear regression
    slope, intercept = np.polyfit(x, y, 1)

    # Generate the line values
    line_x = np.array([min(x), max(x)])
    line_y = slope * line_x + intercept

    # Plot the data points and the best-fit line
    plt.scatter(x, y, label='Data')
    plt.plot(line_x, line_y, color='red', label='Best-fit line')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.legend()
    plt.show()


calculate_best_fit_line([1, 2, 3, 4, 5], [2, 3, 5, 4, 6])


def linear_approximation(x, y):
    # Применяем метод наименьших квадратов для аппроксимации
    A = np.vstack([x, np.ones(len(x))]).T
    m, c = np.linalg.lstsq(A, y, rcond=None)[0]

    # Создаем массив значений x для рисования линии
    x_values = np.linspace(min(x), max(x), 100)
    y_values = m * x_values + c

    # Визуализация данных и аппроксимационной прямой
    plt.scatter(x, y, label='Данные')
    plt.plot(x_values, y_values, 'r', label=f'Аппроксимация: y = {m:.2f}x + {c:.2f}')
    plt.legend()
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.show()


# Пример использования
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 3, 5, 4, 6])

linear_approximation(x, y)
