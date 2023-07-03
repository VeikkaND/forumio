const express = require("express")
const router = express.Router()
const Subforum = require("../models/subforum")

router.get("/", async (req, res) => {
    const subforums = await Subforum.find({})
    res.json(subforums)
})

router.get(`/:subforum`, async (req, res) => {
    const subforum = await Subforum.find({name: req.params.subforum})
    res.json(subforum)
})

// subforum creation
router.post("/", async (req, res) => {
    const requst = req.body
    const newSubforum = new Subforum({
        name: requst.name,
        author: requst.author,
        users: requst.author,
        moderators: requst.author
    })
    try {
        await newSubforum.save()
        res.json(newSubforum).status(201)
    } catch (err) {
        res.status(400)
    }
    
})

module.exports = router