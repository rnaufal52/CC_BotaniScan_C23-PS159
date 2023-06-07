from flask import Flask
from flask_cors import CORS
from routes.cornroute import corn_route
from routes.potatoroute import potato_route
from routes.pepperroute import pepper_route

app = Flask(__name__)

# Konfigurasi CORS
cors_config = {
    "origins": ["http://localhost:5000"],  # Daftar domain yang diizinkan
    "methods": ["POST"],  # Hanya metode POST yang diizinkan
}

# Inisialisasi CORS pada aplikasi Flask dengan konfigurasi
CORS(app, resources={r"/*": cors_config})

# Route untuk corn model
app.register_blueprint(corn_route)

# Route untuk potato model
app.register_blueprint(potato_route)

# Route untuk pepper model
app.register_blueprint(pepper_route)

if __name__ == '__main__':
    app.run()
