from music21 import stream, chord, note, instrument, tempo, meter, midi
import os
import subprocess

save_path = os.path.join(os.path.expanduser(
    "~"), "Documents", "diogen_sad_track_improved.mid")

score = stream.Score()
score.append(tempo.MetronomeMark(number=65))
score.append(meter.TimeSignature('4/4'))

# Виолончель
cello_part = stream.Part()
cello_part.insert(0, instrument.Violoncello())

# Труба (высокая октава)
trumpet_part = stream.Part()
trumpet_part.insert(0, instrument.Trumpet())

# Перкуссия (тимпаны — звучат ярче)
percussion_part = stream.Part()
percussion_part.insert(0, instrument.Timpani())

# Генерация минорных аккордов
roots = ['A3', 'D4', 'E4', 'C4', 'F3', 'B3', 'G3', 'A3']

for root_pitch in roots:
    root = note.Note(root_pitch)
    c = chord.Chord([root, root.transpose(3), root.transpose(7)])
    c.quarterLength = 2  # укоротил длительность
    cello_part.append(c)

    # Труба играет среднюю ноту аккорда на 1 такт (4 доли), октава +1
    trumpet_note = note.Note(c.pitches[1])
    trumpet_note.octave += 1
    trumpet_note.quarterLength = 4
    trumpet_part.append(trumpet_note)

    # Перкуссия бьет 4 раза по четверти
    for _ in range(4):
        hit = note.Note('C2')
        hit.quarterLength = 1
        percussion_part.append(hit)

score.append(cello_part)
score.append(trumpet_part)
score.append(percussion_part)

mf = midi.translate.streamToMidiFile(score)
mf.open(save_path, 'wb')
mf.write()
mf.close()

print(f"Файл создан: {save_path}")

if os.name == 'nt':
    subprocess.run(['explorer', os.path.dirname(save_path)])
