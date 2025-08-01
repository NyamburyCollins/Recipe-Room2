import API from "../api/axios";
import type { Recipe } from "../types/Recipe";

// Existing API calls
export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await API.get("/recipes");
  return response.data;
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await API.get(`/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (
  recipeData: Partial<Recipe>
): Promise<{ message: string }> => {
  const response = await API.post("/recipes", recipeData);
  return response.data;
};

export const updateRecipe = async (
  id: number,
  recipeData: Partial<Recipe>
): Promise<{ message: string }> => {
  const response = await API.put(`/recipes/${id}`, recipeData);
  return response.data;
};

export const deleteRecipe = async (
  id: number
): Promise<{ message: string }> => {
  const response = await API.delete(`/recipes/${id}`);
  return response.data;
};

// Frontend-only mock functions

export const fetchUserRecipes = async (userId: number): Promise<Recipe[]> => {
  // Replace this with actual logic to filter user's recipes from your global state or localStorage
  const allRecipes = await getRecipes();
  return allRecipes.filter((recipe) => recipe.userId === userId);
};

export const fetchFavoriteRecipes = async (userId: number): Promise<Recipe[]> => {
  // Replace this with your favorite logic or source
  const allRecipes = await getRecipes();
  return allRecipes.filter((recipe) => recipe.favoritedBy?.includes(userId));
};