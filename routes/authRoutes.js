const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const auth = require("../middleware/auth");

// Pages
router.get("/register", authController.registerPage);

router.get("/login", authController.loginPage);

// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.loginUser);

// Logout 
router.get("/logout", authController.logoutUser);

module.exports = router;