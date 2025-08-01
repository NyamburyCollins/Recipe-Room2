import React, { useState } from 'react';
import RecipeCard from '../components/recipes/RecipeCard';
import  type { Recipe } from '../components/recipes/RecipeCard';
import axios from 'axios';

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      const meals = response.data.meals || [];

      const mappedRecipes: Recipe[] = meals.map((meal: any) => ({
        id: parseInt(meal.idMeal),
        title: meal.strMeal,
        imageUrl: meal.strMealThumb,
        country: meal.strArea,
        servings: Math.floor(Math.random() * 5) + 1, // Fake servings
        rating: Math.floor(Math.random() * 5) + 1, // Fake rating
      }));

      setRecipes(mappedRecipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Search Recipes</h2>

      <form className="mb-4" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Fetching recipes...</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div key={recipe.id} className="col">
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <p className="text-center">No recipes found. Try a different search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;