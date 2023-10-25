const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
const { User } = require("../models")
const { OAuth2Client } = require("google-auth-library")

const client = new OAuth2Client()

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

            if (user.password === "google") {
                throw {name: "GoogleLogin"}
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

    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            })
            const payload = ticket.getPayload()
            // const userid = payload["sub"]
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            // console.log(payload)
            const { email, given_name } = payload
    
            const user = await User.findOne({
                where: {
                    email: email,
                },
            })
            let token
    
            if (!user) {
                const newUser = await User.create(
                    {
                        email: email,
                        username: given_name,
                        password: "google",
                    },
                    {
                        hooks: false,
                    }
                )
                token = createToken({
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role,
                })
            } else {
                token = createToken({
                    id: newUser.id,
                    email: user.email,
                    role: user.role,
                })
            }
    
            res.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller