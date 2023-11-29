const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", passport.authenticate("local"))

router.get("/google", passport.authenticate("google"))

router.get("/google/redirect", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
}))

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect("/")
    })
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

module.exports = router