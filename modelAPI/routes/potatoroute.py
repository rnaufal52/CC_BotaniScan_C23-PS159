from flask import request, Blueprint
from controller.potato_controller import predict_potato

potato_route = Blueprint('potato_route', __name__)

@potato_route.route('/predict/potato', methods=['POST'])
def predict_potato_route():
    return predict_potato(request)
