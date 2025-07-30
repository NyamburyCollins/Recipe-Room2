from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models import User, Group, Recipe


group_bp = Blueprint('groups', __name__)

# Create a new group
@group_bp.route('/groups', methods=['POST'])
@jwt_required()
def create_group():
    data = request.json
    user_id = get_jwt_identity()

    group = Group(name=data['name'], created_by=user_id)
    group.members.append(User.query.get(user_id))  # add creator to members list

    db.session.add(group)
    db.session.commit()
    return jsonify({"message": "Group created", "group_id": group.id}), 201


# Join a group
@group_bp.route('/groups/<int:group_id>/join', methods=['POST'])
@jwt_required()
def join_group(group_id):
    user_id = get_jwt_identity()
    group = Group.query.get_or_404(group_id)
    user = User.query.get(user_id)

    if user in group.members:
        return jsonify({"message": "Already a member"}), 400

    group.members.append(user)
    db.session.commit()
    return jsonify({"message": f"Joined group {group.name}"})


# Leave a group
@group_bp.route('/groups/<int:group_id>/leave', methods=['POST'])
@jwt_required()
def leave_group(group_id):
    user_id = get_jwt_identity()
    group = Group.query.get_or_404(group_id)
    user = User.query.get(user_id)

    if user not in group.members:
        return jsonify({"message": "Not a member of this group"}), 400

    group.members.remove(user)
    db.session.commit()
    return jsonify({"message": f"Left group {group.name}"})


# Add a recipe to a group
@group_bp.route('/groups/<int:group_id>/recipes', methods=['POST'])
@jwt_required()
def add_recipe_to_group(group_id):
    data = request.json
    group = Group.query.get_or_404(group_id)
    recipe = Recipe.query.get(data['recipe_id'])

    if not recipe:
        return jsonify({"message": "Recipe not found"}), 404

    group.recipes.append(recipe)
    db.session.commit()
    return jsonify({"message": f"Recipe added to group {group.name}"})


# List groups the user is a member of
@group_bp.route('/groups/my', methods=['GET'])
@jwt_required()
def my_groups():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify([{"id": g.id, "name": g.name} for g in user.groups])


# List recipes in a group
@group_bp.route('/groups/<int:group_id>/recipes', methods=['GET'])
@jwt_required()
def get_group_recipes(group_id):
    group = Group.query.get_or_404(group_id)
    return jsonify([{"id": r.id, "title": r.title} for r in group.recipes])