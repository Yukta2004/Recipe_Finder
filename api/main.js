document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-btn");
    const inputField = document.getElementById("ingredient-input");
    const recipeContainer = document.getElementById("recipe-container");

    searchButton.addEventListener("click", async () => {
        const ingredients = inputField.value.trim();

        if (!ingredients) {
            alert("Please enter at least one ingredient.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/recipes/search?ingredients=${encodeURIComponent(ingredients)}`);
            const recipes = await response.json();

            if (recipes.length === 0) {
                recipeContainer.innerHTML = `<p class="text-gray-600 text-lg">No recipes found with the given ingredients.</p>`;
            } else {
                displayRecipes(recipes);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            recipeContainer.innerHTML = `<p class="text-red-600 text-lg">Error fetching recipes. Please try again.</p>`;
        }
    });
});

function displayRecipes(recipes) {
    const container = document.getElementById("recipe-container");
    container.innerHTML = ""; // Clear previous results

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col sm:flex-row items-center";

        card.innerHTML = `
            <img src="${recipe.imageUrl}" alt="${recipe.TranslatedRecipeName}" class="w-full sm:w-96 h-56 object-cover rounded-md">
            <div class="mt-4 sm:mt-0 sm:ml-6 w-full">
                <h2 class="text-3xl font-bold">${recipe.TranslatedRecipeName}</h2>
                <p class="text-gray-600"><strong>Cuisine:</strong> ${recipe.Cuisine}</p>
                <p class="text-gray-600"><strong>Time:</strong> ${recipe.TotalTimeInMins} mins</p>
                <p class="text-gray-700"><strong>Ingredients:</strong> ${recipe.CleanedIngredients.join(", ")}</p>
                <p class="text-gray-700">
                    <strong>Instructions:</strong> 
                    ${recipe.TranslatedInstructions.substring(0, 150)}...
                    <a href="recipe-details.html?id=${recipe._id}" class="text-blue-500 hover:underline">Read More</a>
                </p>
            </div>`;

        container.appendChild(card);
    });
}

