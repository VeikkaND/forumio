const router = require("express").Router()
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

router.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

router.get("/user/:username", async (req, res) => {
    const user = await User.findOne({username: req.params.username})
    if(user) {
        res.json(user).status(200)
    } else {
        res.send("user not found").status(404)
    }
    
})

router.post("/", async (req, res) => {
    const request = req.body
    const newUser = new User({
        username: request.username,
        creationDate: req.timestamp
    })
    
    try {
        await newUser.save()
        const saltRounds = 10
        bcrypt.hash(request.password, saltRounds, async (err, hash) => {
            await User.findByIdAndUpdate(newUser._id, {password: hash})
        })  
        res.json(newUser).status(201)
    } catch(err) {
        res.status(400)
    }
    
})

router.get("/login", async (req, res) => {
    const user = await User.findOne({username: req.headers.username})
    if(user) {
        bcrypt.compare(req.headers.password, user.password, (err, result) => {
            if(result === true) {
                // return token
                const token = jwt.sign({user: user}, process.env.SECRET)
                res.json({
                    token: token, 
                    userId: user._id, 
                    username: user.username
                }).status(200)
            } else {
                res.send(false).status(401)
            }
        })
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