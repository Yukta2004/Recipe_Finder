import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetails";

function App() {
    const [ingredients, setIngredients] = useState("");

    return (
        <Router>
            <div className="p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Recipe Finder</h1>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto p-4">
                    <input
                        type="text"
                        placeholder="Enter ingredients..."
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                    <button
                        className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => setIngredients(ingredients)}
                    >
                        Search Recipes
                    </button>
                </div>

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<RecipeList ingredients={ingredients} />} />
                    <Route path="/recipe/:id" element={<RecipeDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
