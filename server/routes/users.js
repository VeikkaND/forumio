const router = require("express").Router()
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

// get all users
router.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// get user by username
router.get("/user/:username", async (req, res) => {
    const user = await User.findOne({username: req.params.username})
    if(user) {
        res.json(user).status(200)
    } else {
        res.send("user not found").status(404)
    }
    
})

// new user
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

// check login details for user
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

// delete user
router.delete("/:id", async (req, res) => {
    const deleteId = req.params.id
    try {
        await User.findByIdAndDelete(deleteId)
        res.send(`deleted user ${deleteId}`).status(204)
    } catch (err) {
        res.send("User not found").status(400)
    }
})

// subscribe/unsubscribe user from subforums
router.put("/", async (req, res) => {
    const subforumId = req.body.subforumId
    const decodedToken = req.decodedToken
    const user = await User.findById(decodedToken.user._id)
    try {
        if(user) {
            if(user.subscriptions.includes(subforumId)) {
                // unsubscribe from subforum
                const newSubforums = user.subscriptions
                    .filter(sub => !sub.equals(subforumId))
                await User.findByIdAndUpdate(
                    decodedToken.user._id, 
                    {subscriptions: newSubforums}
                )
                res.status(200)
            } else {
                // subscribe to subforum
                const newSubforums = user.subscriptions.concat(subforumId)
                await User.findByIdAndUpdate(
                    decodedToken.user._id, 
                    {subscriptions: newSubforums}
                )
                res.status(200)
            }
        } else {
            res.status(404)
        }
    } catch (err) {
        res.status(400)
    }
})

module.exports = router