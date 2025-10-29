import argparse

parser = argparse.ArgumentParser(description='Пример использования argparse.')
parser.add_argument('--example', type=int, help='Пример аргумента.')
parser.add_argument('--f', type=str, help='Новый аргумент.')

args = parser.parse_args()
print(args.example)
print(args.f)

# тестирование в комстроке  


def gcd_recursion(num1, num2):
    if num1 == 0:
        return num2
    return gcd_recursion(num2 % num1, num1)
