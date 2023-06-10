import logging
from flask import jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import io
import numpy as np

# Load potato model
model = load_model('modelAI/best_model1.h5') #ubah path model

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
        file = request.files['file']
        img = image.load_img(io.BytesIO(file.read()), target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
  
        images = np.vstack([x])
        images /= 255

        classes = model.predict(images, batch_size=32)
        predicted_class_indices = np.argmax(classes)

        # Contoh: Anda dapat mengembalikan hasil prediksi sebagai label kelas dan persentase prediksinya
        class_labels = ['non_potato', 'early_blight', 'healthy', 'late_blight']
        predicted_label = class_labels[predicted_class_indices]

        # Format hasil prediksi sebagai JSON
        response = {
            'prediction': predicted_label,
            'confidence': round(np.max(classes) * 100, 2)
        }

        # Mengembalikan respons JSON
        return jsonify(response)
    except Exception as e:
        logging.error(str(e))
        return jsonify({'error': 'Invalid image file'})