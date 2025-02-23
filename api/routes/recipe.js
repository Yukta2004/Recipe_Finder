const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

router.get("/search", async (req, res) => {
    try {
        let { ingredients } = req.query;

        if (!ingredients || ingredients.trim() === "") {
            return res.status(400).json({ message: "Please provide at least one ingredient." });
        }

        // Decode URL-encoded ingredients & convert to lowercase
        const ingredientsArray = decodeURIComponent(ingredients)
            .split(",")
            .map(item => item.trim().toLowerCase());

        if (ingredientsArray.length > 15) {
            return res.status(400).json({ message: "Please provide a maximum of 4 ingredients." });
        }

        console.log("Searching for recipes with ingredients:", ingredientsArray);

        // Fetch recipes that contain at least one of the given ingredients
        const foundRecipes = await Recipe.find({
            TranslatedIngredients: { $in: ingredientsArray }
        });

        // Sort results by number of matching ingredients
        const sortedRecipes = foundRecipes.map(recipe => {
            const matchedCount = recipe.TranslatedIngredients.filter(ing =>
                ingredientsArray.includes(ing.toLowerCase())
            ).length;
            return { ...recipe.toObject(), matchedCount };
        }).sort((a, b) => b.matchedCount - a.matchedCount);

        if (sortedRecipes.length === 0) {
            return res.status(404).json({ message: "No recipes found with the given ingredients." });
        }

        res.json(sortedRecipes);
    } catch (error) {
        console.error("Error in /search API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/recipes/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        res.json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
