const router = require("express").Router()
const Post = require("../models/post")
const Subforum = require("../models/subforum")
const Comment = require("../models/comment")
const User = require("../models/user")

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
    const decodedToken = req.decodedToken
    try {
        const post = await Post.findById(req.params.id)
        if(decodedToken.user.username === post.author_name) {
            await Post.findByIdAndDelete(req.params.id)
            await Comment.deleteMany({post: req.params.id})

            // remove post from users in DB
            const user = await User.findById(decodedToken.user._id)
            const newPosts = user.posts.filter(p => !p.equals(post._id))
            await User.findByIdAndUpdate(decodedToken.user._id, {posts: newPosts})
            res.send("post deleted").status(204)
        } else {
            res.send("can't delete").status(400)
        }
        
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
        subforum: subforum._id,
        date: req.timestamp,
        latestComment: req.timestamp
    })
    try {
        await newPost.save()

        // add post to users in DB
        const user = await User.findById(decodedToken.user._id)
        const newUserPosts = user.posts.concat(newPost)
        await User.findByIdAndUpdate(user._id, {posts: newUserPosts})

        // add post to subforum in DB
        const newSubPosts = subforum.posts.concat(newPost._id) 
        await Subforum.findByIdAndUpdate(subforum._id, {posts: newSubPosts})

        res.json(newPost).status(201)
    } catch (err) {
        res.send("something went wrong").status(400)
    }
    
})

// add/remove votes to post
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

// remove vote from post
router.put("/:id/remove", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const decodedToken = req.decodedToken
        if(req.body.vote === 1) {
            // remove like
            const newLikes = post.likes
                .filter(post => !post.equals(decodedToken.user._id))
            await Post.findByIdAndUpdate(req.params.id, {likes: newLikes})
            res.json({...post, likes: newLikes}).status(200)
        } else {
            // remove dislike
            const newDislikes = post.dislikes
                .filter(post => !post.equals(decodedToken.user._id))
            await Post
                .findByIdAndUpdate(req.params.id, {dislikes: newDislikes})
            res.json({...post, dislikes: newDislikes}).status(200)
        }
    } catch (err) {
        res.send("could not remove like from post").status(400)
    }
})

module.exports = router