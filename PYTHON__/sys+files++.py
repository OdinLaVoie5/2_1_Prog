import argparse

parser = argparse.ArgumentParser(description='Пример использования argparse.')
parser.add_argument('--example', type=int, help='Пример аргумента.')
parser.add_argument('--f', type=str, help='Новый аргумент.')

args = parser.parse_args()
print(args.example)
print(args.f)

# тестирование в комстроке  
