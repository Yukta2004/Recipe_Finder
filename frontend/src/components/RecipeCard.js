import React from "react";
import { Link } from "react-router-dom";



function RecipeCard({ recipe }) {
  if (!recipe) {
    return <p className="text-red-500">Error: Recipe not found</p>;
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-6">
      <img
        className="w-full h-48 object-cover rounded-md"
        src={recipe.imageUrl || "https://via.placeholder.com/150"}
        alt={recipe.TranslatedRecipeName}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold">{recipe.TranslatedRecipeName}</h2>
        <p><strong>Cuisine:</strong> {recipe.Cuisine}</p>
        <p><strong>Time:</strong> {recipe.TotalTimeInMins} mins</p>
        <p><strong>Ingredients:</strong> {recipe.CleanedIngredients.slice(0, 3).join(", ")}...</p>
        <Link to={`/recipe/${recipe.id}`} className="text-blue-500">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
