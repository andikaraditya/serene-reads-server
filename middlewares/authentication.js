const { verifyToken } = require('../helpers/jwt');
const {User} = require('../models');

async function authentication(req, res, next) {
    try {
        const {access_token} = req.headers

        if (!access_token) {
            throw {name: "AuthenticationFailed"}
        }

        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)

        if (!user) {
            throw {name: "AuthenticationFailed"}
        }

        req.user = payload

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication