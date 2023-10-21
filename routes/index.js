const express = require("express")
const router = express.Router()
const books = require('./books')
const Auth = require('../controllers/auth');
const News = require('../controllers/news');

router.post("/login", Auth.login)

router.post("/register", Auth.register)

router.get("/news", News.getNews)

router.use("/books", books)

module.exports = router
