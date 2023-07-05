const jwt = require("jsonwebtoken")
require("dotenv").config()

const tokenDecoder = (req, res, next) => {
    const authorization = req.headers.authorization
    if(authorization) {
        const token = authorization.replace("Bearer ", "")
        req.decodedToken = jwt.verify(token, process.env.SECRET)
    }
    next()
}

module.exports = {tokenDecoder}