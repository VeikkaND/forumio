const router = require("express").Router()
const User = require("../models/user")

router.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

router.post("/", async (req, res) => {
    const request = req.body
    const newUser = new User({
        username: request.username,
        password: request.password
    })
    try {
        await newUser.save()
        res.json(newUser).status(201)
    } catch(err) {
        res.status(400)
    }
    
})

module.exports = router