import { useState } from "react";
import axios from "axios";

export default function SearchRecipes() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (response.data.meals) {
        setRecipes(response.data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch (err) {
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Search Recipes</h2>
      <form onSubmit={handleSearch} className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.idMeal}>
            <div className="card h-100">
              <img
                src={recipe.strMealThumb}
                className="card-img-top"
                alt={recipe.strMeal}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.strMeal}</h5>
                <p className="card-text">
                  Category: {recipe.strCategory} <br />
                  Area: {recipe.strArea}
                </p>
                <a
                  href={recipe.strSource || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-secondary"
                >
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}