const express = require("express")
const router = express.Router()
const Subforum = require("../models/subforum")

router.get("/", async (req, res) => {
    const subforums = await Subforum.find({})
    res.json(subforums)
})

router.get("/:subforum", async (req, res) => {
    const subforum = await Subforum.find({name: req.params.subforum})
    if(subforum.length !== 0) {
        res.json(subforum)
    } else {
        res.send("404 not found").status(404)
    }
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

router.delete(`/:subforum`, async (req, res) => {
    const subforum = await Subforum.findOne({name: req.params.subforum})
    if(subforum) {
        try {
            await Subforum.findByIdAndDelete(subforum._id)
            res.send("subforum deleted").status(204)
        } catch (err) {
            res.send("Something went wrong").status(400)
        }
    } else {
        res.send("subforum not found").status(404)
    }
    
})

module.exports = router