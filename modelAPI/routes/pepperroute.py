from flask import request, Blueprint
from controller.pepper_controller import predict_pepper

pepper_route = Blueprint('pepper_route', __name__)

@pepper_route.route('/predict/pepper', methods=['POST'])
def predict_pepper_route():
    return predict_pepper(request)
