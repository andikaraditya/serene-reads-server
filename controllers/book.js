const {Book} = require('../models');

class Controller {
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

            res.status(200).json(book)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller