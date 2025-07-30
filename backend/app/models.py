from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates
from app.extensions import db

# Association table for users and groups
group_members = db.Table(
    'group_members',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey('groups.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)
    profile_image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    recipes = db.relationship('Recipe', back_populates='author', lazy=True)
    comments = db.relationship('Comment', back_populates='user', lazy=True)
    bookmarks = db.relationship('Bookmark', back_populates='user', lazy=True)
    ratings = db.relationship('Rating', back_populates='user', lazy=True)
    favorites = db.relationship('Favorite', back_populates='user', lazy=True)

    @property
    def password(self):
        raise AttributeError("Password is write-only.")

    @password.setter
    def password(self, plain_text_password):
        if len(plain_text_password) < 6:
            raise ValueError("Password must be at least 6 characters.")
        self._password_hash = generate_password_hash(plain_text_password)

    def check_password(self, password):
        return check_password_hash(self._password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "profile_image_url": self.profile_image_url,
            "created_at": self.created_at.isoformat()
        }


class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    procedure = db.Column(db.Text, nullable=False)
    country = db.Column(db.String(100))
    number_of_people_served = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String)
    video_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    author = db.relationship('User', back_populates='recipes')
    ingredients = db.relationship('Ingredient', back_populates='recipe', lazy=True, cascade="all, delete")
    comments = db.relationship('Comment', back_populates='recipe', lazy=True, cascade="all, delete")
    ratings = db.relationship('Rating', back_populates='recipe', lazy=True, cascade="all, delete")
    bookmarks = db.relationship('Bookmark', back_populates='recipe', lazy=True, cascade="all, delete")
    favorites = db.relationship('Favorite', back_populates='recipe', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "procedure": self.procedure,
            "country": self.country,
            "number_of_people_served": self.number_of_people_served,
            "image_url": self.image_url,
            "video_url": self.video_url,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id
        }


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.String)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    recipe = db.relationship('Recipe', back_populates='ingredients')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'recipe_id': self.recipe_id
        }


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    user = db.relationship('User', back_populates='comments')
    recipe = db.relationship('Recipe', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'username': self.user.username,
            'recipe_id': self.recipe_id
        }


class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    user = db.relationship('User', back_populates='bookmarks')
    recipe = db.relationship('Recipe', back_populates='bookmarks')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id
        }


class Rating(db.Model):
    __tablename__ = 'ratings'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))

    user = db.relationship('User', back_populates='ratings')
    recipe = db.relationship('Recipe', back_populates='ratings')

    @validates('score')
    def validate_score(self, key, score):
        if not 1 <= score <= 5:
            raise ValueError("Rating must be between 1 and 5.")
        return score

    def to_dict(self):
        return {
            'id': self.id,
            'score': self.score,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id
        }


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String)

    members = db.relationship('User', secondary=group_members, backref='groups')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'members': [member.to_dict() for member in self.members]
        }


class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    user = db.relationship('User', back_populates='favorites')
    recipe = db.relationship('Recipe', back_populates='favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id
        }