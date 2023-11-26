const express = require("express")
const authRouter = require("./routes/auth")
const passportSetup = require("./config/passport")
const session = require("express-session")
const dotenv = require("dotenv")
const passport = require("passport")
dotenv.config()

// Initialize Express
app = express()
app.set("view engine", "ejs")

// Express middlewares
app.use(express.static("./public"))
app.use(express.static("./images"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.authenticate("session"))
app.use(passport.initialize())

// Express routers
app.use("/auth", authRouter)

// Srodo homepage
app.get("/", (req, res) => {
    res.render("homepage", { user: req.user })
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})