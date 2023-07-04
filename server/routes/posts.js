const router = require("express").Router()
const Post = require("../models/post")

router.get("/", async (req, res) => {
    const posts = await Post.find({})
    res.json(posts).status(200)
})

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("replies")
        res.json(post).status(200)
    } catch(err) {
        res.send("something went wrong").status(400)
    }
    
})

router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.send("post deleted").status(204)
    } catch (err) {
        res.send("user not found").status(404)
    }
    
})

router.post("/", async (req, res) => {
    const request = req.body
    const newPost = new Post({
        title: request.title,
        content: request.content,
        author: request.authorId,
        subforum: request.subforumId,
    })
    try {
        newPost.save()
        res.json(newPost).status(201)
    } catch (err) {
        res.send("something went wrong").status(400)
    }
    
})

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const newLikes = post.likes += req.body.vote
        await Post.findByIdAndUpdate(req.params.id, {likes: newLikes})
        res.json({...post, likes: newLikes}).status(200)
    } catch (err) {
        res.send("could not like post").status(400)
    }
})

module.exports = router