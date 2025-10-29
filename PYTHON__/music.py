import sys
print(sys.executable)
from music21 import stream, tempo, meter, key, chord, midi
import os
import subprocess
import traceback


try:
    # Путь сохранения файла
    save_path = os.path.expanduser(r"~\Documents\diogen_sad_track.mid")

    # Создаем музыкальный поток
    score = stream.Score()
    part = stream.Part()

    # Установка темпа и размера
    part.append(tempo.MetronomeMark(number=65))
    part.append(meter.TimeSignature('4/4'))
    part.append(key.Key('A', 'minor'))

    # 4 прогрессии по 4 такта (новые аккорды каждый раз!)
    for _ in range(4):
        for pitches in [["A3", "C4", "E4"], ["D4", "F4", "A4"], ["E3", "G3", "B3"], ["A3", "C4", "E4"]]:
            c = chord.Chord(pitches)
            c.quarterLength = 4
            part.append(c)

    score.append(part)

    # Сохраняем в MIDI
    mf = midi.translate.streamToMidiFile(score)
    mf.open(save_path, 'wb')
    mf.write()
    mf.close()

    print(f"Файл успешно сохранён: {save_path}")

    # Открытие папки (только на Windows)
    if os.name == 'nt':
        folder = os.path.dirname(save_path)
        subprocess.run(['explorer', folder])
    else:
        print("Открытие папки работает только в Windows.")

except Exception as e:
    print("Произошла ошибка!")
    print(f"Ошибка: {e}")
    traceback.print_exc()
