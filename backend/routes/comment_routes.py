from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db

from app.models import Comment

comment_bp = Blueprint('comments', __name__)

@comment_bp.route('/comment', methods=['POST'])
@jwt_required()
def add_comment():
    data = request.json
    user_id = get_jwt_identity()
    comment = Comment(user_id=user_id, recipe_id=data['recipe_id'], content=data['content'])
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added"})

@comment_bp.route('/comments/<int:recipe_id>', methods=['GET'])
def get_comments(recipe_id):
    comments = Comment.query.filter_by(recipe_id=recipe_id).all()
    return jsonify([{"user_id": c.user_id, "content": c.content} for c in comments])