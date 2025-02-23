const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { fetchAndProcessRecipes } = require('./stringToArray'); // Import function
const recipeRouter = require('./routes/recipe');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Recipe";

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1); // Exit if the database connection fails
  });

// API Endpoint to get processed recipes
app.get('/api/processed-recipes', async (req, res) => {
  try {
    const processedRecipes = await fetchAndProcessRecipes();
    res.json(processedRecipes);
  } catch (error) {
    res.status(500).json({ message: "Error processing recipes", error });
  }
});

// Use Recipe Routes
app.use('/api/recipes', recipeRouter);

// Test Route
app.get('/', (req, res) => {
  res.send(" API is running...");
});

// Start Server
app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
