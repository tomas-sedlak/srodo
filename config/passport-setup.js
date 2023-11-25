const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const dotenv = require("dotenv")
dotenv.config()

passport.use(
    new GoogleStrategy({
        callbackURL: "/auth/google/redirect",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => {
        const user = {
            "google_id": profile.id,
            "displayname": profile.displayName,
            "email": profile.emails[0].value,
            "profile_picture": profile.photos[0].value
        }
        console.log(user)
    })
)