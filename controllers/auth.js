const { User } = require("../models")

class Controller {
    static async register(req, res, next) {
        try {
            const {username, email, password} = req.body

            const data = await User.create({
                username,
                email,
                password
            })

            res.status(201).json({
                username: data.username,
                email: data.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller