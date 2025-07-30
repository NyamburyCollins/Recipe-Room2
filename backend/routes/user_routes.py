from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models import User
from utils.cloudinary_helper import upload_image


user_bp = Blueprint('users', __name__)

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    if 'username' in request.form:
        user.username = request.form['username']
    if 'profile_image' in request.files:
        image_url = upload_image(request.files['profile_image'])
        user.profile_image = image_url

    db.session.commit()
    return jsonify({"message": "Profile updated"})