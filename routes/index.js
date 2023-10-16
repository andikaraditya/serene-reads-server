const express = require("express")
const router = express.Router()
const books = require('./books')
const Auth = require('../controllers/auth');

router.post("/login", (req, res) => {
    res.send("Login")
})

router.post("/register", Auth.register)

router.use("/books", books)

module.exports = router
