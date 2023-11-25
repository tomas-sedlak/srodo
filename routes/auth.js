const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

router.get("/auth/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("Success")
})

router.get("/logout", (req, res) => {
    res.send("Log out page")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

module.exports = router