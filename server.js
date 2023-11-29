const express = require("express")
const flash = require("express-flash")
const session = require("express-session")
const passport = require("passport")
const authRouter = require("./routes/auth")
const passportSetup = require("./config/passport")

// Setup enviroment variables
const dotenv = require("dotenv")
dotenv.config()

// Connect to database
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/srodo", {
    family: 4 // Important! Otherwise it returns timeout error
})

// Initialize Express
app = express()
app.set("view engine", "ejs")

// Express middlewares
app.use(express.static("./public"))
app.use(express.static("./images"))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

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