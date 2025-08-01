import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import  type { Recipe } from "../types/Recipe.ts";
import { fetchUserRecipes, fetchFavoriteRecipes } from "../services/recipeService";


const Profile = () => {
  const { user } = useAuth();
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!user) return;

    const loadRecipes = async () => {
      try {
        const created = await fetchUserRecipes(user.id);
        const favorites = await fetchFavoriteRecipes(user.id);
        setUserRecipes(created);
        setFavoriteRecipes(favorites);
      } catch (error) {
        console.error("Failed to load profile data:", error);
      }
    };

    loadRecipes();
  }, [user]);

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>
      <p className="mb-6 text-gray-600">Email: {user.email}</p>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Your Recipes</h2>
        {userRecipes.length === 0 ? (
          <p>You haven't created any recipes yet.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userRecipes.map((recipe) => (
              <li key={recipe.id} className="bg-white rounded-lg p-4 shadow">
                <h3 className="text-lg font-medium">{recipe.title}</h3>
                <p className="text-sm text-gray-500">{recipe.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-3">Favorite Recipes</h2>
        {favoriteRecipes.length === 0 ? (
          <p>You haven't favorited any recipes yet.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteRecipes.map((recipe) => (
              <li key={recipe.id} className="bg-white rounded-lg p-4 shadow">
                <h3 className="text-lg font-medium">{recipe.title}</h3>
                <p className="text-sm text-gray-500">{recipe.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;