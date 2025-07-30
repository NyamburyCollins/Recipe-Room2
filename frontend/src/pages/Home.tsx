import RecipeCard from "../components/recipes/RecipeCard";

const mockRecipes = [
  {
    id: 1,
    title: "Sushi",
    imageUrl: "/images/sushi.jpg",  
    servings: 2,
    country: "Japan",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Pizza Margherita",
    imageUrl: "/images/pizza.jpg",
    servings: 4,
    country: "Italy",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Beef Stew",
    imageUrl: "/images/beefstew.jpg",
    servings: 5,
    country: "Kenya",
    rating: 4.7,
  },
];

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-info mb-4">Welcome to Recipe Room</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {mockRecipes.map((recipe) => (
          <div className="col" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;