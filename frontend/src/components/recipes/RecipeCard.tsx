import React from 'react';
import { Link } from 'react-router-dom';

type Recipe = {
  id: number;
  title: string;
  imageUrl: string;
  servings: number;
  country: string;
  rating: number;
};

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/recipes/${recipe.id}`} className="text-decoration-none text-dark">
        <img
          src={recipe.imageUrl}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text mb-1"><strong>Serves:</strong> {recipe.servings}</p>
          <p className="card-text mb-1"><strong>Country:</strong> {recipe.country}</p>
          <p className="card-text"><strong>Rating:</strong> {recipe.rating} ⭐</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;