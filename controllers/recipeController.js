const Recipe = require("../models/Recipe");

// Show Add Recipe Page
exports.showAddRecipe = (req, res) => {

    res.render("recipe/add", {

        title: "Add Recipe"

    });

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

        res.redirect("/recipe/add");

    }

    catch (error) {

        console.log(error);

        req.flash("error", "Failed to Add Recipe.");

        res.redirect("/recipe/add");

    }

};