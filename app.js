if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const cors = require('cors')
const router = require("./routes")
const errorhandler = require("./middlewares/errorhandler")
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to Serene Reads server")
})

app.use("/", router)

app.use(errorhandler)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
