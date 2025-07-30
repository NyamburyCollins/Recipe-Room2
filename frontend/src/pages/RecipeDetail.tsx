import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find(r => r.id === Number(id))
  );

  if (!recipe) {
    return (
      <div className="container mt-5">
        <h2 className="text-danger">Recipe not found</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-warning">{recipe.title}</h1>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
      <p><strong>Steps:</strong></p>
      <p>{recipe.steps}</p>
    </div>
  );
};

export default RecipeDetail;