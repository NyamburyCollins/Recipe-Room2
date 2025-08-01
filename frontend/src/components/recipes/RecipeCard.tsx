import React from 'react';
import { Link } from 'react-router-dom';

export type Recipe = {
  id: number;
  title: string;
  imageUrl?: string;    // Used in frontend
  image_url?: string;   // Used if coming from backend API
  servings?: number;
  country?: string;
  rating?: number;
};

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const imageSrc = recipe.imageUrl || recipe.image_url || "/default-image.jpg";

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/recipes/${recipe.id}`} className="text-decoration-none text-dark">
        <img
          src={imageSrc}
          className="card-img-top"
          alt={recipe.title || "Recipe image"}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text mb-1">
            <strong>Serves:</strong> {recipe.servings ?? 'N/A'}
          </p>
          <p className="card-text mb-1">
            <strong>Country:</strong> {recipe.country ?? 'Unknown'}
          </p>
          <p className="card-text">
            <strong>Rating:</strong> {recipe.rating ?? 'Not rated'} ⭐
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;