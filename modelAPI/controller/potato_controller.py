import logging
from flask import jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import cv2
import numpy as np

# Load potato model
model = load_model('modelAI/potato_model_1.h5') #ubah path model

logging.basicConfig(level=logging.DEBUG)

def predict_potato(request):
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

        # Resize gambar ke ukuran yang diharapkan oleh model (256x256)
        resized_img = cv2.resize(img, (256, 256))

        # Ubah gambar menjadi format yang sesuai dengan model
        processed_img = preprocess_image(resized_img)

        # Lakukan prediksi menggunakan model
        prediction = model.predict(processed_img)
        predicted_class = np.argmax(prediction)
        predicted_percentage = np.max(prediction) * 100

        # Contoh: Anda dapat mengembalikan hasil prediksi sebagai label kelas dan persentase prediksinya
        class_labels = ['non_potato_clean', 'potato_early_blight', 'potato_healthy', 'potato_early_blight']
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

def preprocess_image(image):
    # Normalisasi gambar
    image = image.astype('float32') / 255.0

    # Ekspansi dimensi gambar (menyesuaikan dengan input model)
    image = np.expand_dims(image, axis=0)

    return image
