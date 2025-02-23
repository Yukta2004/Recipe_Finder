document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (!recipeId) {
        document.getElementById("recipe-details").innerHTML = "<p class='text-red-600'>Recipe not found.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/recipes/${recipeId}`);
        const recipe = await response.json();

        if (!recipe) {
            document.getElementById("recipe-details").innerHTML = "<p class='text-red-600'>Recipe not found.</p>";
            return;
        }

        // Populate HTML with recipe details
        document.getElementById("recipe-name").textContent = recipe.TranslatedRecipeName;
        document.getElementById("recipe-image").src = recipe.imageUrl;
        document.getElementById("recipe-cuisine").innerHTML = `<strong>Cuisine:</strong> ${recipe.Cuisine}`;
        document.getElementById("recipe-time").innerHTML = `<strong>Time:</strong> ${recipe.TotalTimeInMins} mins`;
        document.getElementById("recipe-ingredients").innerHTML = `<strong>Ingredients:</strong> ${recipe.CleanedIngredients.join(", ")}`;
        document.getElementById("recipe-instructions").innerHTML = `<strong>Instructions:</strong> ${recipe.TranslatedInstructions}`;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        document.getElementById("recipe-details").innerHTML = "<p class='text-red-600'>Error fetching recipe details. Please try again.</p>";
    }
});

// Function to go back to the main page
function goBack() {
    window.history.back();
}
