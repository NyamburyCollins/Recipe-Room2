import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import { addRecipe } from '../store/recipeSlice';
import RecipeForm from "../components/recipes/RecipeForm";
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCreate = (data: any) => {
    const newRecipe = {
      id: Date.now(),  // Auto-generate ID
      title: data.title,
      ingredients: data.ingredients.split(',').map((i: string) => i.trim()),  // convert string to array
      steps: data.procedure,
      description: "",  // optional, can extend form later
    };

    dispatch(addRecipe(newRecipe));
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-success mb-4">Add a New Recipe</h1>
      <RecipeForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateRecipe;