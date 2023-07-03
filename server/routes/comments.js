const router = require("express").Router()
const Comment = require("../models/comment")
const Post = require("../models/post")

router.get("/", async (req, res) => {
    const comments = await Comment.find({})
    res.json(comments).status(200)
})

router.get("/:id", async (req, res) => {
    const comment = await Comment.findById(req.params.id)
        .populate("replies")
    if(comment) {
        res.json(comment).status(200)
    } else {
        res.send("not found").status(404)
    }  
})

router.post("/", async (req, res) => {
    const request = req.body
    if(!request.parentId) {
        var newComment = new Comment({
            content: request.content,
            author: request.authorId,
            post: request.postId,
        })
        const post = await Post.findById(request.postId)
        const newReplies = post.replies.concat(newComment._id)
        console.log(post.replies)
        await Post.findByIdAndUpdate(request.postId, {replies: newReplies})
    } else {
        var newComment = new Comment({
            content: request.content,
            author: request.authorId,
            post: request.postId,
            parent: request.parentId
        })
        const parentComment = await Comment.findById(request.parentId)
        const newReplies = parentComment.replies.concat(newComment._id)
        await Comment.findByIdAndUpdate(request.parentId, {replies: newReplies})
    }
    try {
        newComment.save()
        res.send(newComment).status(201)
    } catch (err) {
        res.send("something went wrong").status(400)
    }
})

router.delete("/:id", async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    try {
        if(comment) {
            await Comment.findByIdAndDelete(comment._id)
            res.send("comment deleted").status(204)
        } else {
            res.send("comment not found").status(404)
        }
        
    } catch (err) {
        res.send("something went wrong").status(400)
    }
})

module.exports = router