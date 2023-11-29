const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"],
        match: [/^[a-zA-Z0-9_]+$/, "Helso ma obsahovat len pismena, cisla a _"]
    },
    displayName: String,
    email: {
        type: String,
        unique: [true, "Email already in use"],
        required: [true, "Email is required"]
    },
    loginMethod: String,
    local: {
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Heslo musi mat minimalne 8 znakov"]
        },
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