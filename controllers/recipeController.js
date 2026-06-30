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

// ==========================
// Get Single Recipe
// ==========================
exports.getRecipeDetails = async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!recipe) {

            req.flash("error", "Recipe not found.");

            return res.redirect("/recipes");

        }

        res.render("recipe/details", {

            title: recipe.title,

            recipe

        });

    } catch (error) {

        console.log(error);

        req.flash("error", "Something went wrong.");

        res.redirect("/recipes");

    }

};

// ==========================
// Show Edit Recipe Page
// ==========================
exports.showEditRecipe = async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {

            req.flash("error", "Recipe not found.");

            return res.redirect("/recipes");

        }

        // Only owner can edit
        if (recipe.createdBy.toString() !== req.user.id) {

            req.flash("error", "Access Denied.");

            return res.redirect("/recipes");

        }

        res.render("recipe/edit", {

            title: "Edit Recipe",

            recipe

        });

    } catch (error) {

        console.log(error);

        req.flash("error", "Something went wrong.");

        res.redirect("/recipes");

    }

};

// ==========================
// Update Recipe
// ==========================
exports.updateRecipe = async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {

            req.flash("error", "Recipe not found.");

            return res.redirect("/recipes");

        }

        if (recipe.createdBy.toString() !== req.user.id) {

            req.flash("error", "Access Denied.");

            return res.redirect("/recipes");

        }

        recipe.title = req.body.title;
        recipe.description = req.body.description;
        recipe.category = req.body.category;
        recipe.cuisine = req.body.cuisine;
        recipe.servings = req.body.servings;
        recipe.cookingTime = req.body.cookingTime;
        recipe.instructions = req.body.instructions;

        await recipe.save();

        req.flash("success", "Recipe Updated Successfully.");

        res.redirect("/recipe/" + recipe._id);

    } catch (error) {

        console.log(error);

        req.flash("error", "Unable to Update Recipe.");

        res.redirect("/recipes");

    }

};

// ==========================
// Delete Recipe
// ==========================
exports.deleteRecipe = async (req, res) => {

    try {

        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {

            req.flash("error", "Recipe not found.");

            return res.redirect("/recipes");

        }

        // Only owner can delete
        if (recipe.createdBy.toString() !== req.user.id) {

            req.flash("error", "Access Denied.");

            return res.redirect("/recipes");

        }

        await Recipe.findByIdAndDelete(req.params.id);

        req.flash("success", "Recipe Deleted Successfully.");

        res.redirect("/recipes");

    } catch (error) {

        console.log(error);

        req.flash("error", "Unable to Delete Recipe.");

        res.redirect("/recipes");

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