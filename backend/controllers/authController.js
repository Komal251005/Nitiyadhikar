const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            mobileNumber,
            city,
            username,
            password,
            termsAccepted
        } = req.body;

        const userEmail = email ? email.toLowerCase().trim() : null;
        const userMobile = mobileNumber ? mobileNumber.trim() : null;

        // Check required fields
        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        // Duplicate check for email if provided
        if (userEmail) {
            const existingEmail = await User.findOne({ email: userEmail });
            if (existingEmail) {
                return res.status(400).json({
                    message: "Email is already registered"
                });
            }
        }

        // Duplicate check for mobile number if provided
        if (userMobile) {
            const existingMobile = await User.findOne({ mobileNumber: userMobile });
            if (existingMobile) {
                return res.status(400).json({
                    message: "Mobile number is already registered"
                });
            }
        }

        // Duplicate check for username if provided
        if (username) {
            const existingUsername = await User.findOne({ username: username.trim() });
            if (existingUsername) {
                return res.status(400).json({
                    message: "Username is already taken"
                });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Derive username if not explicitly provided
        const finalUsername = username ? username.trim() : (userEmail ? userEmail.split("@")[0] : `user_${Date.now()}`);

        // Create new user record
        const user = await User.create({
            firstName: firstName ? firstName.trim() : "",
            lastName: lastName ? lastName.trim() : "",
            email: userEmail || "",
            mobileNumber: userMobile || "",
            city: city ? city.trim() : "",
            username: finalUsername,
            password: hashedPassword,
            termsAccepted: termsAccepted !== undefined ? termsAccepted : true
        });

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                city: user.city,
                username: user.username
            }
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({
            message: "Server error during registration"
        });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username/Email and password are required"
            });
        }

        const inputKey = username.trim();

        // Find user by username, email, or mobile number
        const user = await User.findOne({
            $or: [
                { username: inputKey },
                { email: inputKey.toLowerCase() },
                { mobileNumber: inputKey }
            ]
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Compare password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username || user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username || user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    signup,
    login
};