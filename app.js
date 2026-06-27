require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(methodOverride("_method"));

app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(flash());
app.use("/", userRoutes);


// Flash Messages
app.use((req, res, next) => {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();

});

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

app.use(expressLayouts);

app.set("layout", "layouts/main");

// Home Route
app.get("/", (req, res) => {

    res.render("index", {

        title: "Recipe Book"

    });

});

// Server

const PORT = process.env.PORT || 5000;
app.use("/", authRoutes);

app.listen(PORT, () => {

    console.log(`Server Running on http://localhost:${PORT}`);

});