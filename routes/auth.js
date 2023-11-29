const router = require("express").Router()
const User = require("../models/user")
const passport = require("passport")
const crypto = require("crypto")

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

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body

    // const salt = crypto.randomBytes(32)
    // crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hashedPassword) => {
    //     console.log(hashedPassword)
    // })

    try {
        const user = new User({
            "username": username,
            "email": email,
            "local.password": password
        })
        await user.save()
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {}
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
            });
            
            console.log(errors)
            res.render("signup", {
                errors: errors,
                username: username,
                email: email,
                password: password
            })
        }
    }
})

module.exports = router