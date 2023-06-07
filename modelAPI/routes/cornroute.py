from flask import request, Blueprint
from controller.corn_controller import predict_corn

corn_route = Blueprint('corn_route', __name__)

@corn_route.route('/predict/corn', methods=['POST'])
def predict_corn_route():
    return predict_corn(request)
