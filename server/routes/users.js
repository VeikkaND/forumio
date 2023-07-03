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

router.delete(`/:id`, async (req, res) => {
    const deleteId = req.params.id
    try {
        await User.findByIdAndDelete(deleteId)
        res.send(`deleted user ${deleteId}`).status(204)
    } catch (err) {
        res.send("User not found").status(400)
    }
})

module.exports = router