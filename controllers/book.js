const {Book, Post, User} = require('../models');
const axios = require('axios');
const { Op } = require("sequelize");

class Controller {
    static async getBooks(req, res, next) {
        try {
            const {title, author, page} = req.query

            const options = {
                order: [["title", "ASC"]],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                limit: 8,
                offset: 0,
                where: {}
            }

            if (title) {
                options.where.title = {
                    [Op.iLike]: `%${title}%`
                }
            }

            if (author) {
                options.where.author = {
                    [Op.iLike]: `%${author}%`
                }
            }

            if (page) {
                options.offset = (page-1) * 8
            }

            const data = await Book.findAll(options)

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
                        exclude: ["createdAt","updatedAt"]
                    },
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                order:[[Post , "createdAt", "DESC"]]
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

    static async searchBook(req, res, next) {
        try {
            const {title, author, book_type, categories, page=1} = req.query
            const {data} = await axios({
                method: 'GET',
                url: 'https://book-finder1.p.rapidapi.com/api/search',
                params: {
                    title,
                    author,
                    book_type,
                    categories,
                    results_per_page: 10,
                    page
                },
                headers: {
                    'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.X_RapidAPI_Host
                }
            })

            const output = data.results.map((el) => {
                return {
                    title: el.title,
                    author: el.authors[0],
                    summary: el.summary,
                    isbn: el.canonical_isbn,
                    imageUrl: el.published_works[0].cover_art_url
                }
            })
            res.status(200).json(output)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller