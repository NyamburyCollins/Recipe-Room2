import API from "../api/axios";

export interface Recipe {
  id: number;
  title: string;
  description: string;
  procedure: string;
  country: string;
  number_of_people_served: number;
  image_url?: string;
  video_url?: string;
  user_id: number;
  created_at?: string;
}

// Fetch all recipes
export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await API.get("/recipes");
  return response.data;
};

// Fetch a recipe by ID
export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await API.get(`/recipes/${id}`);
  return response.data;
};

// Create a new recipe
export const createRecipe = async (recipeData: Partial<Recipe>): Promise<Recipe> => {
  const response = await API.post("/recipes", recipeData);
  return response.data;
};

// Update an existing recipe
export const updateRecipe = async (id: number, recipeData: Partial<Recipe>): Promise<Recipe> => {
  const response = await API.put(`/recipes/${id}`, recipeData);
  return response.data;
};

// Delete a recipe
export const deleteRecipe = async (id: number): Promise<{ message: string }> => {
  const response = await API.delete(`/recipes/${id}`);
  return response.data;
};