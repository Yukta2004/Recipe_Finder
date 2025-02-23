const Recipe = require('./models/Recipe'); // Import the Recipe model

// Define measurement units to remove
const measurementWords = [
    "tablespoon", "tablespoons", "teaspoon", "teaspoons",
    "cup", "cups", "grams", "kg", "ml", "liters", "ounces",
    "tbsp", "tsp", "g", "lb", "oz"
];

// Function to clean and split ingredient strings
const cleanIngredients = (ingredientsArray) => {
    if (!Array.isArray(ingredientsArray)) {
        return [];
    }

    return ingredientsArray.map(ingredient => {
        let words = ingredient.trim().split(" ");
        let filteredWords = words.filter(word =>
            !measurementWords.includes(word.toLowerCase()) &&
            isNaN(word)  // Remove numbers
        );
        return filteredWords.join(" ");
    });
};

// Function to fetch and process recipes from MongoDB
const fetchAndProcessRecipes = async () => {
    try {
        let recipes = await Recipe.find(); // Fetch from MongoDB

        // Process recipes to clean ingredients
        recipes = recipes.map(recipe => ({
            ...recipe._doc, // Preserve other fields
            TranslatedIngredients: cleanIngredients(recipe.TranslatedIngredients)
        }));

        return recipes;
    } catch (error) {
        console.error("Error fetching recipes from MongoDB:", error);
        return [];
    }
};

// Export function for use in `server.js`
module.exports = { fetchAndProcessRecipes };
