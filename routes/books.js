const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Get all Book Forum")
})

router.post("/", (req, res) => {
    res.send("Create Book Forum")
})

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