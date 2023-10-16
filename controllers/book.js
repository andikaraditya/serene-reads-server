const {Book} = require('../models');

class Controller {
    static async getBooks(req, res, next) {
        try {
            const data = await Book.findAll({
                order: [["title", "ASC"]]
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createBook(req, res, next) {
        try {
            const {title, author, summary, isbn, imageUrl} = req.body

            const book = await Book.create({
                title,
                author,
                summary,
                isbn,
                imageUrl
            })

            res.status(201).json(book)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller