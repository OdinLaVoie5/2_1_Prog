import onnxruntime as ort
import numpy as np
from PIL import Image
import json
from pathlib import Path

# --- Пути ---
BASE_DIR   = Path(__file__).resolve().parent.parent  # PYTHON__ (на уровень выше)
MODEL_PATH = BASE_DIR / "MODELS" / "resnet101-v1-7.onnx"
LABELS_PATH = BASE_DIR / "MODELS" / "imagenet-simple-labels.json"
IMAGES_DIR = BASE_DIR / "IMAGES"

# --- Модель ---
session = ort.InferenceSession(str(MODEL_PATH), providers=["CPUExecutionProvider"])

# --- Классы ---
with open(LABELS_PATH, "r", encoding="utf-8") as f:
    imagenet_classes = json.load(f)

# --- Функция предобработки ---
def preprocess(image: Image.Image) -> np.ndarray:
    image = image.resize((224, 224))
    img_array = np.array(image).astype(np.float32) / 255.0
    img_array = img_array.transpose(2, 0, 1)  # HWC -> CHW
    return img_array[np.newaxis, :, :, :]     # + batch

# --- Inference ---
input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name

# Поддерживаемые расширения
extensions = ["*.jpg", "*.jpeg", "*.png", "*.bmp", "*.gif"]

# Собираем список файлов
image_files = []
for ext in extensions:
    image_files.extend(IMAGES_DIR.glob(ext))

if not image_files:
    print("⚠️ В папке images/ нет подходящих картинок.")
else:
    for img_path in image_files:
        try:
            image = Image.open(img_path).convert("RGB")
        except Exception as e:
            print(f"Ошибка при открытии {img_path.name}: {e}")
            continue

        img_array = preprocess(image)
        logits = session.run([output_name], {input_name: img_array})[0]
        probabilities = np.exp(logits) / np.exp(logits).sum(axis=1, keepdims=True)

        top5_idx = np.argsort(probabilities[0])[::-1][:5]
        print(f"\n=== {img_path.name} ===")
        for idx in top5_idx:
            print(f"{imagenet_classes[idx]}: {probabilities[0][idx]:.4f}")
