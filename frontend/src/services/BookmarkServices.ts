import API from "../api/axios";

export interface Bookmark {
  id: number;
  user_id: number;
  recipe_id: number;
}

export const getBookmarks = async (): Promise<Bookmark[]> => {
  const response = await API.get("/bookmarks");
  return response.data;
};

export const addBookmark = async (recipeId: number): Promise<Bookmark> => {
  const response = await API.post("/bookmarks", { recipe_id: recipeId });
  return response.data;
};

export const removeBookmark = async (bookmarkId: number): Promise<void> => {
  await API.delete(`/bookmarks/${bookmarkId}`);
};

export const toggleBookmark = async (recipeId: number): Promise<Bookmark | null> => {
  try {
    const existing = await API.get(`/bookmarks/recipe/${recipeId}`);
    if (existing.data?.id) {
      await removeBookmark(existing.data.id);
      return null;
    } else {
      return await addBookmark(recipeId);
    }
  } catch (err) {
    return await addBookmark(recipeId);
  }
};