import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Meal = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string | null;
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = await response.json();
          setRecipe(data.meals?.[0] || null);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment.trim()]);
      setNewComment('');
    }
  };

  const getYoutubeEmbedUrl = (url: string | null): string | undefined => {
    if (!url) return undefined;
    const match = url.match(/v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : undefined;
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mt-5">
        <h2 className="text-danger">Recipe not found</h2>
      </div>
    );
  }

  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure?.trim()} ${ingredient.trim()}`);
    }
  }

  const youtubeEmbedUrl = getYoutubeEmbedUrl(recipe.strYoutube);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-warning fw-bold">{recipe.strMeal}</h1>
        <button
          className={`btn ${isFavorited ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorited ? 'Unfavorite' : 'Add to Favorites'}
        </button>
      </div>

      {recipe.strMealThumb && (
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="img-fluid mb-4 rounded shadow"
        />
      )}

      <h4 className="fw-bold">Ingredients</h4>
      <ul className="list-group mb-4">
        {ingredients.map((item, index) => (
          <li className="list-group-item" key={index}>
            {item}
          </li>
        ))}
      </ul>

      <h4 className="fw-bold">Instructions</h4>
      <p className="fw-semibold" style={{ whiteSpace: 'pre-line' }}>
        {recipe.strInstructions}
      </p>

      {youtubeEmbedUrl && (
        <div className="my-4">
          <h4 className="fw-bold">Watch on YouTube</h4>
          <div className="ratio ratio-16x9">
            <iframe
              src={youtubeEmbedUrl}
              title="YouTube Video"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="my-5">
        <h4 className="fw-bold">Comments</h4>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Leave a comment..."
          ></textarea>
          <button className="btn btn-primary mt-2" onClick={handleAddComment}>
            Post Comment
          </button>
        </div>

        {comments.length > 0 && (
          <ul className="list-group">
            {comments.map((comment, index) => (
              <li key={index} className="list-group-item">
                {comment}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;