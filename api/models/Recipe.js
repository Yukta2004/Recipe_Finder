const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    Srno: { type: Number, required: true },
    TranslatedRecipeName: { type: String, required: true },
    TranslatedIngredients: { type: [String], required: true },
    TotalTimeInMins: { type: Number, required: true },
    Cuisine: { type: String, required: true },
    TranslatedInstructions: { type: String },
    // URL: { type: String },
    CleanedIngredients: { type: [String] }, // Changed to an array for easier filtering
    imageUrl: { type: String },
    IngredientsCount: { type: Number }    
});

module.exports = mongoose.model('Recipe', RecipeSchema);
