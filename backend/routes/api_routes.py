from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import db, User, Recipe, Bookmark, Rating, Comment
import requests

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered"}), 400

    user = User(username=data['username'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id)
    return jsonify(access_token=token)

@api.route('/recipes', methods=['GET'])
def get_recipes():
    name = request.args.get('name')
    ingredient = request.args.get('ingredient')
    country = request.args.get('country')

    base_url = "https://www.themealdb.com/api/json/v1/1/"
    if name:
        url = f"{base_url}search.php?s={name}"
    elif ingredient:
        url = f"{base_url}filter.php?i={ingredient}"
    elif country:
        url = f"{base_url}filter.php?a={country}"
    else:
        url = f"{base_url}latest.php"

    response = requests.get(url)
    data = response.json()

    # Add your fields
    if data.get("meals"):
        for meal in data["meals"]:
            meal["user_rating"] = None
            meal["bookmarked"] = False

    return jsonify(data)

@api.route('/bookmark', methods=['POST'])
@jwt_required()
def bookmark_recipe():
    data = request.json
    user_id = get_jwt_identity()
    bookmark = Bookmark(user_id=user_id, recipe_id=data['recipe_id'])
    db.session.add(bookmark)
    db.session.commit()
    return jsonify({"message": "Bookmarked"})

@api.route('/bookmarks', methods=['GET'])
@jwt_required()
def get_bookmarks():
    user_id = get_jwt_identity()
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
    return jsonify([{"recipe_id": b.recipe_id} for b in bookmarks])

@api.route('/rating', methods=['POST'])
@jwt_required()
def add_rating():
    data = request.json
    user_id = get_jwt_identity()
    rating = Rating(user_id=user_id, recipe_id=data['recipe_id'], rating=data['rating'])
    db.session.add(rating)
    db.session.commit()
    return jsonify({"message": "Rating added"})

@api.route('/ratings/<int:recipe_id>', methods=['GET'])
def get_ratings(recipe_id):
    ratings = Rating.query.filter_by(recipe_id=recipe_id).all()
    return jsonify([{"user_id": r.user_id, "rating": r.rating} for r in ratings])

@api.route('/comment', methods=['POST'])
@jwt_required()
def add_comment():
    data = request.json
    user_id = get_jwt_identity()
    comment = Comment(user_id=user_id, recipe_id=data['recipe_id'], content=data['content'])
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment added"})

@api.route('/comments/<int:recipe_id>', methods=['GET'])
def get_comments(recipe_id):
    comments = Comment.query.filter_by(recipe_id=recipe_id).all()
    return jsonify([{"user_id": c.user_id, "content": c.content} for c in comments])