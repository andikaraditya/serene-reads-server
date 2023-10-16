const express = require("express")
const router = express.Router()
const books = require('./books');

router.get("/login", (req, res) => {
    res.send("Login")
})

router.get("/register", (req, res) => {
    res.send("Register")
})

router.use("/books", books)

module.exports = router
