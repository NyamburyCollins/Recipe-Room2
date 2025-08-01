import React, { useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes/search?query=${encodeURIComponent(query)}`
      );
      setResults(response.data.recipes); // depends on backend response shape
    } catch (error) {
      console.error("Error searching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="input-group mb-3">
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

      {loading && <Loader />}

      {results.length > 0 && (
        <div className="mt-3">
          <h4>Results:</h4>
          <ul className="list-group">
            {results.map((recipe, index) => (
              <li key={index} className="list-group-item">
                <strong>{recipe.title}</strong> — {recipe.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchForm;