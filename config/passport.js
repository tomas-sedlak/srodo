const passport = require("passport")
const User = require("../models/user")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
// const db = require("./db")

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({
        "username": username,
        "local.password": password
    })

    console.log(user)
}))

// passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/redirect",
//         scope: ["profile", "email"]
//     }, (accessToken, refreshToken, profile, done) => {
//         db.query("SELECT * FROM users WHERE google_id=?", [
//             profile.id
//         ], (err, row) => {
//             if (err) return done(err)
//             if (row.length > 0) {
//                 console.log("Found")
//                 done(null, row[0])
//             } else {
//                 console.log(
//                     profile.id,
//                     profile.displayName,
//                     profile.emails[0].value
//                 )
//                 db.query("INSERT INTO users (username, google_id, displayname, email, profile_picture) VALUES (?, ?, ?, ?, ?)", [
//                     "test",
//                     profile.id,
//                     profile.displayName,
//                     profile.emails[0].value,
//                     profile.photos[0].value
//                 ], (err, row) => {
//                     console.log("Inserted:", row[0])
//                     done(null, row[0])
//                 })
//             }
//         })
//     })
// )

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    // db.query("SELECT * FROM users WHERE id=?", [id], (err, row) => {
    //     if (err) { return done(err) }
    //     done(null, row[0])
    // })
    User.findById(id, (err, user) => {
        done(null, user)
    })
})