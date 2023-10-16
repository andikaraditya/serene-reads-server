const express = require("express")
const authentication = require("../middlewares/authentication")
const Book = require('../controllers/book');
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Get all Book Forum")
})

router.post("/", authentication, Book.createBook)

router.get("/:BookId", (req, res) => {
    res.send("Get Book Forum by id")
})

router.post("/:BookId/posts", (req, res) => {
    res.send("Create post in a forum")
})

router.get("/:BookId/posts/:PostId", (req, res) => {
    res.send("Geta a post in a forum by id")
})

module.exports = router