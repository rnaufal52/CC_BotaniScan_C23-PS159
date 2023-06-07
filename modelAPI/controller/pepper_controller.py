import logging
from flask import jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import cv2
import numpy as np

# Load pepper model
model = load_model('modelAI/corn_model_2.h5') #ubah pepper model

logging.basicConfig(level=logging.DEBUG)

def predict_pepper(request):
    # Periksa apakah ada file gambar yang dikirimkan dalam permintaan
    if 'file' not in request.files:
        logging.error('No file found')
        return jsonify({'error': 'No file found'})

    file = request.files['file']

    # Periksa apakah file memiliki nama
    if file.filename == '':
        logging.error('No filename provided')
        return jsonify({'error': 'No filename provided'})

    try:
        # Baca gambar dan ubah ke dalam format yang sesuai
        img = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_COLOR)

        # Resize gambar ke ukuran yang diharapkan oleh model (224x224)
        resized_img = cv2.resize(img, (224, 224))

        # Segmentasi warna pada gambar
        segmented_img = segment_image(resized_img)

        # Ubah gambar menjadi format yang sesuai dengan model
        processed_img = preprocess_image(segmented_img)

        # Lakukan prediksi menggunakan model
        prediction = model.predict(processed_img)
        predicted_class = np.argmax(prediction)
        predicted_percentage = np.max(prediction) * 100

        # Contoh: Anda dapat mengembalikan hasil prediksi sebagai label kelas dan persentase prediksinya
        class_labels = ['penyakit 1','penyakit 2','penyakit 3','penyakit 4']
        predicted_label = class_labels[predicted_class]

        # Format hasil prediksi sebagai JSON
        response = {
            'prediction': predicted_label,
            'confidence': round(predicted_percentage, 2)
        }

        # Mengembalikan respons JSON
        return jsonify(response)
    except Exception as e:
        logging.error(str(e))
        return jsonify({'error': 'Invalid image file'})

def segment_image(image):
    # Konversi gambar ke ruang warna HSV
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Definisikan range warna daun jagung
    lower_green = (30, 50, 50)
    upper_green = (90, 255, 255)

    # Buat mask untuk segmen warna daun jagung
    mask = cv2.inRange(hsv, lower_green, upper_green)

    # Terapkan mask ke gambar asli
    result = cv2.bitwise_and(image, image, mask=mask)

    return result

def preprocess_image(image):
    # Normalisasi gambar
    image = image.astype('float32') / 255.0

    # Ekspansi dimensi gambar (menyesuaikan dengan input model)
    image = np.expand_dims(image, axis=0)

    return image
