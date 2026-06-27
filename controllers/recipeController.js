const Recipe = require("../models/Recipe");

// Show Add Recipe Page
exports.showAddRecipe = (req, res) => {

    res.render("recipe/add", {

        title: "Add Recipe"

    });

};

// ==========================
// Show All Recipes
// ==========================
exports.getAllRecipes = async (req, res) => {

    try {

        const recipes = await Recipe.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 });

        res.render("recipe/list", {

            title: "All Recipes",

            recipes

        });

    } catch (error) {

        console.log(error);

        req.flash("error", "Unable to fetch recipes.");

        res.redirect("/");

    }

};

// Save Recipe
exports.addRecipe = async (req, res) => {

    try {

        const {

            title,
            description,
            category,
            cuisine,
            servings,
            cookingTime,
            instructions

        } = req.body;

        const recipe = new Recipe({

            title,
            description,
            category,
            cuisine,
            servings,
            cookingTime,
            instructions,

            createdBy: req.user.id,

            ingredients: []

        });

        await recipe.save();

        req.flash("success", "Recipe Added Successfully.");

        res.redirect("/recipes");

    }

    catch (error) {

        console.log(error);

        req.flash("error", "Failed to Add Recipe.");

        res.redirect("/recipe/add");

    }

};