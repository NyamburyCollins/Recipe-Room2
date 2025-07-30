import os
import re
import requests
from io import BytesIO
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def sanitize_recipe_name(name):
    return re.sub(r'\W+', '_', name.strip()).lower()

def upload_image(file, folder="uploads"):
    """
    Upload a generic image to Cloudinary.
    Returns the secure URL of the uploaded image.
    """
    try:
        result = cloudinary.uploader.upload(
            file,
            folder=folder,
            resource_type="image"
        )
        return result["secure_url"]
    except Exception as e:
        print(f"[ERROR] Image upload failed: {e}")
        return None

def upload_recipe_image(file, recipe_name):
    public_id = f"recipes/{sanitize_recipe_name(recipe_name)}"
    try:
        result = cloudinary.uploader.upload(
            file,
            folder="recipes",
            public_id=public_id,
            resource_type="image",
            overwrite=True
        )
        return result["secure_url"]
    except Exception as e:
        print(f"[ERROR] Failed to upload '{recipe_name}': {e}")
        return None

def upload_from_url(image_url, recipe_name):
    try:
        response = requests.get(image_url)
        if response.status_code == 200:
            return upload_recipe_image(BytesIO(response.content), recipe_name)
        else:
            print(f"[ERROR] Failed to fetch image from URL: {image_url}")
            return None
    except Exception as e:
        print(f"[ERROR] Image fetch failed: {e}")
        return None

def delete_recipe_image(recipe_name):
    public_id = f"recipes/{sanitize_recipe_name(recipe_name)}"
    try:
        result = cloudinary.uploader.destroy(public_id, invalidate=True)
        return result
    except Exception as e:
        print(f"[ERROR] Failed to delete image '{recipe_name}': {e}")
        return None