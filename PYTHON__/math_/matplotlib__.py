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




# ============================================================
# ИНТЕРПОЛЯЦИЯ  НЬЮТОН    ПОДОБРАТЬ ФУНКЦИЮ  ПО ДАННЫМ ТОЧКАМ  полиномом

# Заданные точки данных
x_data = np.array([1, 2, 3, 4, 5])
y_data = np.array([2, 1, 0, 1, 2])

# Интерполяция полиномом Ньютона
coefficients = np.polyfit(x_data, y_data, len(x_data)-1)

# Получение полинома
poly = np.poly1d(coefficients)

# Вывод полинома
print("Полученный полином:")
print(poly)


# ------------------------------------
def newton_interpolation(x_data, y_data, x):
    """
    Интерполяция полиномом Ньютона.
    """
    n = len(x_data)
    coefficients = np.zeros(n)

    # Вычисление разделенных разностей
    for j in range(n):
        coefficients[j] = y_data[j]
        for i in range(j-1, -1, -1):
            coefficients[i] = (coefficients[i+1] -
                               coefficients[i]) / (x_data[j] - x_data[i])

    # Вычисление значения полинома в точке x
    result = coefficients[0]
    for i in range(1, n):
        term = coefficients[i]
        for j in range(i):
            term *= (x - x_data[j])
        result += term

    return result


# Пример данных
x_data = np.array([1, 2, 3, 4, 7])
y_data = np.array([7, 1, 0, 5, 2])

# Генерация значений для построения графика
x_values = np.linspace(min(x_data), max(x_data), 1000)
y_values = [newton_interpolation(x_data, y_data, x) for x in x_values]

# Построение графика
plt.plot(x_values, y_values, label='Интерполяция полиномом Ньютона')
plt.scatter(x_data, y_data, color='red', label='Исходные данные')
plt.legend()
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Интерполяция полиномом Ньютона')
plt.show()



# -------------------------------------------------

def newton_interpolation(x_data, y_data, x):
    n = len(x_data)
    coefficients = np.zeros(n)

    for j in range(n):
        coefficients[j] = y_data[j]
        for i in range(j - 1, -1, -1):
            coefficients[i] = (coefficients[i + 1] -
                               coefficients[i]) / (x_data[j] - x_data[i])

    result = coefficients[0]
    for i in range(1, n):
        term = coefficients[i]
        for j in range(i):
            term *= (x - x_data[j])
        result += term

    return result


# Генерация случайных данных
np.random.seed(42)
x_data = np.sort(np.random.uniform(0, 10, 10))
y_data = np.random.uniform(0, 100, 10)

# Генерация значений для построения графика
x_values = np.linspace(min(x_data), max(x_data), 1000)
y_values = [newton_interpolation(x_data, y_data, x) for x in x_values]

# Построение графика
plt.plot(x_values, y_values, label='Интерполяция полиномом Ньютона')
plt.scatter(x_data, y_data, color='red', label='Исходные данные')
plt.legend()
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Интерполяция полиномом Ньютона')
plt.show()


# Jupyter  В Python   ннннн
# %%
msg = "Hello World"
print(msg)

# %%
msg = "Hello again"
print(msg)

