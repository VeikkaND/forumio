const dateLogger = (req, res, next) => {
    const date = new Date()
    req.timestamp = date
    next()
}

module.exports = {dateLogger}