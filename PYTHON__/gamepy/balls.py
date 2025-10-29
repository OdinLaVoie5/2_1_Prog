import pygame
import random
import math

# Инициализация Pygame
pygame.init()

# Размер окна
WIDTH, HEIGHT = 800, 600

# Определение цветов
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Создание окна
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Управляемый шар и взаимодействие")

# Создание класса для объектов


class Ball:
    def __init__(self, x, y, radius, color, controlled=False):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.speed = random.randint(2, 5)
        self.direction = random.uniform(0, 2 * math.pi)
        self.controlled = controlled

    def move(self):
        self.x += self.speed * math.cos(self.direction)
        self.y += self.speed * math.sin(self.direction)

    def draw(self, screen):
        pygame.draw.circle(screen, self.color,
                           (int(self.x), int(self.y)), self.radius)


# Создание объектов
balls = [Ball(random.randint(50, WIDTH - 50), random.randint(50, HEIGHT - 50), 20, RED),
         Ball(random.randint(50, WIDTH - 50),
              random.randint(50, HEIGHT - 50), 20, GREEN),
         Ball(random.randint(50, WIDTH - 50), random.randint(50, HEIGHT - 50), 20, BLUE)]

controlled_ball = Ball(WIDTH // 2, HEIGHT // 2, 20, WHITE, controlled=True)

# Основной цикл
running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Обработка столкновений и перемещение объектов
    for ball in balls:
        ball.move()
        for other_ball in balls:
            if ball != other_ball:
                distance = math.sqrt((ball.x - other_ball.x)
                                     ** 2 + (ball.y - other_ball.y) ** 2)
                if distance < ball.radius + other_ball.radius:
                    angle = math.atan2(other_ball.y - ball.y,
                                       other_ball.x - ball.x)
                    overlap = ball.radius + other_ball.radius - distance
                    ball.x -= overlap * math.cos(angle) / 2
                    ball.y -= overlap * math.sin(angle) / 2
                    ball.direction = angle + math.pi
                    other_ball.direction = angle
        if controlled_ball != ball:
            distance = math.sqrt((controlled_ball.x - ball.x)
                                 ** 2 + (controlled_ball.y - ball.y) ** 2)
            if distance < controlled_ball.radius + ball.radius:
                angle = math.atan2(ball.y - controlled_ball.y,
                                   ball.x - controlled_ball.x)
                overlap = controlled_ball.radius + ball.radius - distance
                if controlled_ball.controlled:
                    controlled_ball.x -= overlap * math.cos(angle) / 2
                    controlled_ball.y -= overlap * math.sin(angle) / 2
                ball.x += overlap * math.cos(angle) / 2
                ball.y += overlap * math.sin(angle) / 2
                ball.direction = angle
                if not controlled_ball.controlled:
                    controlled_ball.direction = angle + math.pi

        # Отскок от границ экрана
        if ball.x - ball.radius < 0 or ball.x + ball.radius > WIDTH:
            ball.direction = math.pi - ball.direction
        if ball.y - ball.radius < 0 or ball.y + ball.radius > HEIGHT:
            ball.direction = -ball.direction

    # Управление движением управляемого шара
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        controlled_ball.x -= controlled_ball.speed
    if keys[pygame.K_RIGHT]:
        controlled_ball.x += controlled_ball.speed
    if keys[pygame.K_UP]:
        controlled_ball.y -= controlled_ball.speed
    if keys[pygame.K_DOWN]:
        controlled_ball.y += controlled_ball.speed

    # Отскок управляемого шара от границ экрана
    if controlled_ball.x - controlled_ball.radius < 0:
        controlled_ball.x = controlled_ball.radius
    if controlled_ball.x + controlled_ball.radius > WIDTH:
        controlled_ball.x = WIDTH - controlled_ball.radius
    if controlled_ball.y - controlled_ball.radius < 0:
        controlled_ball.y = controlled_ball.radius
    if controlled_ball.y + controlled_ball.radius > HEIGHT:
        controlled_ball.y = HEIGHT - controlled_ball.radius

    # Перемещение и отрисовка объектов
    screen.fill(BLACK)
    for ball in balls:
        ball.draw(screen)
    controlled_ball.draw(screen)

    pygame.display.update()
    clock.tick(60)  # Ограничение частоты кадров

# Завершение Pygame
pygame.quit()
