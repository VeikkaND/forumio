const router = require("express").Router()
const Post = require("../models/post")
const Subforum = require("../models/subforum")
const Comment = require("../models/comment")

// get all posts
router.get("/", async (req, res) => {
    const posts = await Post.find({})
    res.json(posts).status(200)
})

// get post with id
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("replies")
        res.json(post).status(200)
    } catch(err) {
        res.send("something went wrong").status(400)
    }
    
})

// get all posts for subforum
router.get("/:subforum/all", async (req, res) => {
    try {
        const subforum = await Subforum.findOne({name: req.params.subforum})
        const posts = await Post.find({subforum: subforum.id})
        res.json(posts).status(200)
    } catch (err) {
        res.send("something went wrong").status(400)
    }
})

// delete post with id
router.delete("/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({post: req.params.id})
        res.send("post deleted").status(204)
    } catch (err) {
        res.send("user not found").status(404)
    }
    
})

// add post
router.post("/", async (req, res) => {
    const request = req.body
    const decodedToken = req.decodedToken
    const subforum = await Subforum.findOne({name: request.subforum})
    const newPost = new Post({
        title: request.title,
        content: request.content,
        author: decodedToken.user._id,
        author_name: decodedToken.user.username,
        subforum: subforum._id
    })
    try {
        newPost.save()
        res.json(newPost).status(201)
    } catch (err) {
        res.send("something went wrong").status(400)
    }
    
})

// add/remove likes to post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const decodedToken = req.decodedToken
        if(req.body.vote === 1) { 
            // like
            const newLikes = post.likes.concat(decodedToken.user._id)
            await Post.findByIdAndUpdate(req.params.id, {likes: newLikes})
            res.json({...post, likes: newLikes}).status(200)
        } else { 
            // dislike
            const newDislikes = post.dislikes.concat(decodedToken.user._id)
            await Post.findByIdAndUpdate(req.params.id, {dislikes: newDislikes})
            res.json({...post, dislikes: newDislikes}).status(200)
        }
        
    } catch (err) {
        res.send("could not vote post").status(400)
    }
})

module.exports = router