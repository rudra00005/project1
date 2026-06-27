const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    unit: {
        type: String,
        required: true
    }

});

const recipeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    cuisine: {
        type: String,
        default: "Indian"
    },

    image: {
        type: String,
        default: "default.jpg"
    },

    servings: {
        type: Number,
        default: 1
    },

    cookingTime: {
        type: Number,
        default: 0
    },

    ingredients: [ingredientSchema],

    instructions: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Recipe", recipeSchema);