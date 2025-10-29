import random
import tkinter as tk


def check_win():
    for i in range(4):
        for j in range(4):
            if i == 3 and j == 3:
                if board[i][j] != "":
                    return False
            elif board[i][j] != str(i*4 + j + 1):
                return False
    return True


def shuffle():
    pos = list(range(16))
    random.shuffle(pos)
    for i in range(4):
        for j in range(4):
            x = pos[i*4+j]
            if x == 15:
                board[i][j] = ""
            else:
                board[i][j] = str(x+1)
            buttons[i][j].config(text=board[i][j])


def move(y, x):
    for dy, dx in (-1, 0), (1, 0), (0, -1), (0, 1):
        ny, nx = y+dy, x+dx
        if ny in range(4) and nx in range(4) and board[ny][nx] == "":
            board[ny][nx], board[y][x] = board[y][x], board[ny][nx]
            buttons[ny][nx].config(text=board[ny][nx])
            buttons[y][x].config(text=board[y][x])
            if check_win():
                print("Вы выиграли!")


root = tk.Tk()
buttons = [[None]*4 for _ in range(4)]
board = [[None]*4 for _ in range(4)]
for i in range(4):
    for j in range(4):
        buttons[i][j] = tk.Button(
            root, command=lambda y=i, x=j: move(y, x), width=2, height=1)
        buttons[i][j].grid(row=i, column=j)
shuffle()
root.mainloop()
