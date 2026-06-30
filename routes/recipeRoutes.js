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

router.get("/recipe/:id", recipeController.getRecipeDetails);

// Edit Recipe Page
router.get("/recipe/edit/:id", auth, recipeController.showEditRecipe);

// Update Recipe
router.post("/recipe/edit/:id", auth, recipeController.updateRecipe);

// Delete Recipe
router.post("/recipe/delete/:id", auth, recipeController.deleteRecipe);

module.exports = router;