from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import jsonify
from app.models import User
from app import db


def login_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            return fn(*args, **kwargs)
        except Exception:
            return jsonify({"error": "Unauthorized access"}), 401
    return wrapper


def get_current_user():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        user = db.session.get(User, user_id)
        return user
    except Exception:
        return None


def role_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
                user_id = get_jwt_identity()
                user = db.session.get(User, user_id)
                if user and user.role == required_role:
                    return fn(*args, **kwargs)
                return jsonify({"error": "Forbidden: Insufficient permissions"}), 403
            except Exception:
                return jsonify({"error": "Unauthorized access"}), 401
        return wrapper
    return decorator