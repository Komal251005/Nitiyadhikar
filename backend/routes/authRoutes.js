const express = require("express");
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Protected profile route
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You are authenticated!",
        user: req.user
    });
});

module.exports = router;