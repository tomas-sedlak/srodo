const express = require("express")
app = express()

app.set("view engine", "ejs")

// Express middlewares
app.use(express.static("./public"))

app.get("/", (req, res) => {
    res.send("Srodo homepage")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})