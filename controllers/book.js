const {Book, Post, User} = require('../models');

class Controller {
    static async getBooks(req, res, next) {
        try {
            const data = await Book.findAll({
                order: [["title", "ASC"]],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
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

    static async getBookById(req, res, next) {
        try {
            const {BookId} = req.params

            const book = await Book.findByPk(BookId,{
                include: {
                    model: Post,
                    include: {
                        model: User,
                        attributes: ["username"]
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if (!book) {
                throw {name: "BookNotFound"}
            }

            res.status(200).json(book)
        } catch (error) {
            next(error)
        }
    }

    static async createPost(req, res, next) {
        try {
            const {BookId} = req.params
            const {title, content} = req.body
            const {id} = req.user

            // console.log({BookId, title, content, id})
            const data = await Post.create({
                title: title,
                content: content,
                UserId: id,
                BookId: BookId
            })

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getPostById(req, res, next) {
        try {
            const {PostId} = req.params

            const data = await Post.findByPk(PostId, {
                include: {
                    model: User,
                    attributes: ["username"]
                }
            })

            if (!data) {
                throw {name: "PostNotFound"}
            }

            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller