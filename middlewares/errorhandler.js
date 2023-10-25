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
        case "GoogleLogin":
            res.status(400).json({message: "Use Google to login"})
            break;
        case "TitleEmpty":
            res.status(400).json({message: "Title cannot be empty"})
            break;
        case "ContentEmpty":
            res.status(400).json({message: "Post content cannot be empty"})
            break;
        case "ScheduleEmpty":
            res.status(400).json({message: "Schedule date cannot be empty"})
            break;
        case "BookIdEmpty":
            res.status(400).json({message: "BookId cannot be empty"})
            break;
        case "AuthenticationFailed":
            res.status(401).json({message: "User authentication failed"})
            break;
        case "BookNotFound":
            res.status(404).json({message: "Book not found"})
            break;
        case "PostNotFound":
            res.status(404).json({message: "Post not found"})
            break;
        default:
            res.status(500).json(error)
            console.log(error)
            break;
    }
}

module.exports = errorhandler