const url = 'https://ai-food-recipe-generator-api-custom-diet-quick-meals.p.rapidapi.com/generate?noqueue=1';

const options = {
    method: 'POST',
    headers: {
        'x-rapidapi-key': '929681e386msh5bc59b7a5a309adp16a3e2jsn347b839397dd',
        'x-rapidapi-host': 'ai-food-recipe-generator-api-custom-diet-quick-meals.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        ingredients: [ 'tomato'],
        dietary_restrictions: ['gluten_free'],
        cuisine: 'America',
        meal_type: 'dinner',
        servings: 4,
        lang: 'en'
    })
};

// Define an async function to make the API request
async function generateRecipe() {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const result = await response.json(); // Parse JSON response
        console.log(JSON.stringify(result, null, 2)); // Pretty-print JSON data

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the function
generateRecipe();
