const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
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
            const {email, password} = req.body

            if (!email || !password) {
                throw {name: "EmailPasswordEmpty"}
            }

            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw {name: "EmailPasswordIncorrect"}
            }

            const isPasswordCorrect = comparePassword(password, user.password)
            if (!isPasswordCorrect) {
                throw {name: "EmailPasswordIncorrect"}
            } else {
                const access_token = createToken({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })
                res.status(200).json({access_token})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller