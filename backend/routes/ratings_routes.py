from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Rating

rating_bp = Blueprint('rating_bp', __name__)

@rating_bp.route('/rating', methods=['POST'])
@jwt_required()
def add_rating():
    data = request.json
    user_id = get_jwt_identity()
    rating = Rating(user_id=user_id, recipe_id=data['recipe_id'], rating=data['rating'])
    db.session.add(rating)
    db.session.commit()
    return jsonify({"message": "Rating added"})

@rating_bp.route('/ratings/<int:recipe_id>', methods=['GET'])
def get_ratings(recipe_id):
    ratings = Rating.query.filter_by(recipe_id=recipe_id).all()
    return jsonify([{"user_id": r.user_id, "rating": r.rating} for r in ratings])