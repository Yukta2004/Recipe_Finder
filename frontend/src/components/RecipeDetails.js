import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                console.error("Error fetching recipe:", err);
                setError("Failed to load recipe.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (loading) return <p className="text-center text-blue-500">Loading recipe...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-center">{recipe.TranslatedRecipeName}</h2>
            <img src={recipe.imageUrl} alt={recipe.TranslatedRecipeName} className="w-full max-w-2xl mx-auto my-4 rounded-lg shadow-md" />
            
            <p className="text-gray-700"><strong>Cuisine:</strong> {recipe.Cuisine}</p>
            <p className="text-gray-700"><strong>Total Time:</strong> {recipe.TotalTimeInMins} mins</p>

            <h3 className="text-xl font-bold mt-4">Ingredients</h3>
            <ul className="list-disc pl-5">
                {recipe.CleanedIngredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
            </ul>

            <h3 className="text-xl font-bold mt-4">Instructions</h3>
            <p className="text-gray-700">{recipe.TranslatedInstructions}</p>
        </div>
    );
};

export default RecipeDetail;
