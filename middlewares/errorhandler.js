function errorhandler(error, req, res, next) {
    const {name} = error
    switch (name) {
        case "SequelizeValidationError":
            const data = error.errors.map((el) => el.message)
            res.status(400).json({message: data})
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: error.errors[0].message})
            break;
        case "EmailPasswordEmpty":
            res.status(400).json({message: "Email or password cannot be empty"})
            break;
        case "EmailPasswordIncorrect":
            res.status(400).json({message: "Email or password is incorrect"})
            break;
        default:
            res.status(500).json(error)
            console.log(error)
            break;
    }
}

module.exports = errorhandler