from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import Recipe
import requests

recipe_bp = Blueprint('recipes', __name__)

@recipe_bp.route('/recipes', methods=['GET'])
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

    # Standardize the response for frontend
    meals = data.get("meals", [])
    formatted = []
    for meal in meals or []:
        formatted.append({
            "id": meal.get("idMeal"),
            "title": meal.get("strMeal"),
            "description": meal.get("strInstructions", "")[:100] + "...",
            "image_url": meal.get("strMealThumb"),
        })

    return jsonify(formatted)

@recipe_bp.route('/recipes', methods=['POST'])
def create_recipe():
    data = request.json
    recipe = Recipe(
        title=data['title'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        country=data['country'],
        serves=data['serves'],
        user_id=data['user_id']
    )
    db.session.add(recipe)
    db.session.commit()
    return jsonify({"message": "Recipe created"})