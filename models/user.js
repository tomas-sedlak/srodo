const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    displayName: String,
    email: String,
    loginMethod: String,
    local: {
        hashedPassword: String,
        salt: String,
        emailVerified: Boolean,
        emailVerificationCode: String,
        passwordResetToken: String,
        passwordResetTimestamp: Date
    },
    google: {
        googleId: String,
        accessToken: String
    },
    facebook: {
        facebookId: String,
        accessToken: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    profilePicture: {
        type: String,
        default: "default.jpg"
    },
})

module.exports = mongoose.model("User", userSchema)