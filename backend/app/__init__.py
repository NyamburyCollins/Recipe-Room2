from flask import Flask
from dotenv import load_dotenv
import os

from app.extensions import db, migrate, bcrypt, jwt, cors

load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, supports_credentials=True)

    # Import models so Alembic can detect them
    with app.app_context():
        from app import models  # This imports User, Recipe, Group, etc.

    # Register blueprints
    from routes.auth_routes import auth_bp
    from routes.bookmark_routes import bookmark_bp
    from routes.comment_routes import comment_bp
    from routes.group_routes import group_bp
    from routes.recipe_routes import recipe_bp
    from routes.user_routes import user_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(bookmark_bp, url_prefix='/api/bookmarks')
    app.register_blueprint(comment_bp, url_prefix='/api/comments')
    app.register_blueprint(group_bp, url_prefix='/api/groups')
    app.register_blueprint(recipe_bp, url_prefix='/api/recipes')
    app.register_blueprint(user_bp, url_prefix='/api/users')

    return app