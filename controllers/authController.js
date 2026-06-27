const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ==========================
// Register Page
// ==========================
exports.registerPage = (req, res) => {

    res.render("auth/register", {
        title: "Register"
    });

};

// ==========================
// Login Page
// ==========================
exports.loginPage = (req, res) => {

    res.render("auth/login", {
        title: "Login"
    });

};

// ==========================
// Register User
// ==========================
exports.registerUser = async (req, res) => {

    try {

        const { name, email, password, confirmPassword } = req.body;

        // Check required fields
        if (!name || !email || !password || !confirmPassword) {

            req.flash("error", "All fields are required.");

            return res.redirect("/register");
        }

        // Check passwords
        if (password !== confirmPassword) {

            req.flash("error", "Passwords do not match.");

            return res.redirect("/register");
        }

        // Check if email exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            req.flash("error", "Email already exists.");

            return res.redirect("/register");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        req.flash("success", "Registration successful. Please login.");

        res.redirect("/login");

    } catch (error) {

        console.error(error);

        req.flash("error", "Something went wrong.");

        res.redirect("/register");

    }

};

// ==========================
// Login User
// ==========================
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check if all fields are filled
        if (!email || !password) {

            req.flash("error", "All fields are required.");

            return res.redirect("/login");

        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {

            req.flash("error", "Invalid Email or Password.");

            return res.redirect("/login");

        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            req.flash("error", "Invalid Email or Password.");

            return res.redirect("/login");

        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        req.flash("success", "Login Successful.");

        res.redirect("/profile");

    } catch (error) {

        console.log(error);

        req.flash("error", "Something went wrong.");

        res.redirect("/login");

    }

};

// ==========================
// Logout User
// ==========================
exports.logoutUser = (req, res) => {

    res.clearCookie("token");

    req.flash("success", "Logged Out Successfully.");

    res.redirect("/login");

};