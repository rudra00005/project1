const express = require("express");

const router = express.Router();

const recipeController = require("../controllers/recipeController");

const auth = require("../middleware/auth");

// Show Form
router.get("/recipe/add", auth, recipeController.showAddRecipe);

// Save Recipe
router.post("/recipe/add", auth, recipeController.addRecipe);

// Show All Recipes
router.get("/recipes", recipeController.getAllRecipes);

module.exports = router;