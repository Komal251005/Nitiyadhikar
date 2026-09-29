const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        mobileNumber: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        username: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        termsAccepted: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);