import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecipeList = ({ ingredients }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!ingredients) return;

        const fetchRecipes = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `http://localhost:5000/api/recipes/search?ingredients=${encodeURIComponent(ingredients)}`
                );
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    setRecipes(data);
                } else {
                    setRecipes([]);
                    setError("No recipes found.");
                }
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError("Failed to load recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [ingredients]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Recipes</h2>

            {loading && <p className="text-center text-blue-500">Loading recipes...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-lg shadow-lg p-4 flex">
                        <img
                            src={recipe.imageUrl}
                            alt={recipe.TranslatedRecipeName}
                            className="w-24 h-24 object-cover rounded-md mr-4"
                        />

                        <div>
                            <h3 className="text-xl font-bold">{recipe.TranslatedRecipeName}</h3>
                            <p className="text-gray-600"><strong>Cuisine:</strong> {recipe.Cuisine}</p>
                            <p className="text-gray-600"><strong>Time:</strong> {recipe.TotalTimeInMins} mins</p>
                            <p className="text-gray-700"><strong>Ingredients:</strong> {recipe.CleanedIngredients.slice(0, 4).join(", ")}...</p>
                            <p className="text-gray-700"><strong>Instructions:</strong> {recipe.TranslatedInstructions.substring(0, 80)}...</p>

                            <Link to={`/recipe/${recipe.id}`} className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
