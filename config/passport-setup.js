const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const dotenv = require("dotenv")
dotenv.config()
const db = require("../config/db")

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
        scope: ["profile", "email"]
    }, (accessToken, refreshToken, profile, done) => {
        db.query("SELECT * FROM users WHERE google_id=?", [
            profile.id
        ], (err, row) => {
            if (err) return done(err)
            if (row.length > 0) {
                console.log("Found")
                done(null, row)
            } else {
                console.log(
                    profile.id,
                    profile.displayName,
                    profile.emails[0].value
                )
                db.query("INSERT INTO users (username, google_id, displayname, email) VALUES (?, ?, ?, ?)", [
                    "test",
                    profile.id,
                    profile.displayName,
                    profile.emails[0].value
                ], (err, row) => {
                    console.log("Inserted:", row)
                    done(null, row)
                })
            }
        })
    })
)