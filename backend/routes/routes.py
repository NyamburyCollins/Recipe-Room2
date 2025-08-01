
from flask import Flask, request, jsonify
from app.models import db, Recipe

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///recipes.db" 
db.init_app(app)

@app.route("/recipes", methods=["POST"])
def create_recipe():
    data = request.get_json()
    title = data.get("title")
    image_url = data.get("image_url")

    new_recipe = Recipe(title=title, image_url=image_url)
    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({
        "id": new_recipe.id,
        "title": new_recipe.title,
        "image_url": new_recipe.image_url
    }), 201