const express = require("express")
const router = express.Router()
const books = require('./books')
const Auth = require('../controllers/auth');

router.post("/login", Auth.login)

router.post("/register", Auth.register)

router.use("/books", books)

module.exports = router
