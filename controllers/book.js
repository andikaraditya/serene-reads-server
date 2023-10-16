const {Book} = require('../models');

class Controller {
    static async createBook(req, res, next) {
        try {
            const {title, author, summary, isbn} = req.body
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller