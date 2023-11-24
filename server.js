const express = require("express")
app = express()

app.get("/", (req, res) => {
    res.send("Srodo homepage")
})

const port = 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})