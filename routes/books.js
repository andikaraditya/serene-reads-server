const express = require("express")
const authentication = require("../middlewares/authentication")
const Book = require('../controllers/book');
const router = express.Router()

router.get("/", Book.getBooks)

router.post("/", authentication, Book.createBook)

router.get("/:BookId", Book.getBookById)

router.post("/:BookId/posts", authentication, Book.createPost)

router.get("/:BookId/posts/:PostId", (req, res) => {
    res.send("Geta a post in a forum by id")
})

module.exports = router