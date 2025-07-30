from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db

from app.models import Bookmark

bookmark_bp = Blueprint('bookmarks', __name__)

@bookmark_bp.route('/bookmark', methods=['POST'])
@jwt_required()
def add_bookmark():
    user_id = get_jwt_identity()
    data = request.json
    bookmark = Bookmark(user_id=user_id, recipe_id=data['recipe_id'])
    db.session.add(bookmark)
    db.session.commit()
    return jsonify({"message": "Bookmarked"})

@bookmark_bp.route('/bookmarks', methods=['GET'])
@jwt_required()
def get_bookmarks():
    user_id = get_jwt_identity()
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
    return jsonify([{"recipe_id": b.recipe_id} for b in bookmarks])