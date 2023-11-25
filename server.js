const express = require("express")
const authRouter = require("./routes/auth")
const passportSetup = require("./config/passport-setup")
const dotenv = require("dotenv")
dotenv.config()

// Initialize Express
app = express()
app.set("view engine", "ejs")

// Express middlewares
app.use(express.static("./public"))
app.use(express.static("./images"))

// Express routers
app.use("/", authRouter)

// Srodo homepage
app.get("/", (req, res) => {
    res.send("Srodo homepage")
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})