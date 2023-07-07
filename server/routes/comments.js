const router = require("express").Router()
require("dotenv").config()
const Comment = require("../models/comment")
const Post = require("../models/post")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { populate } = require("../models/subforum")

// get all comments
router.get("/", async (req, res) => {
    const comments = await Comment.find({})
    res.json(comments).status(200)
})

// get comment by id
router.get("/:id", async (req, res) => {
    const comment = await Comment.findById(req.params.id)
        .populate("replies")
    if(comment) {
        res.json(comment).status(200)
    } else {
        res.send("not found").status(404)
    }  
})

// get comments by post
router.get("/:postid/all", async (req, res) => {
    try {
        const comments = await Comment
            .find({post: req.params.postid})
                //.populate("replies")
        res.json(comments).status(200)
    } catch (err) {
        res.send("something went wrong").status(404)
    }  
})

// post new comment
router.post("/", async (req, res) => {
    const comment = req.body.comment
    const postId = req.body.postId
    const decodedToken = req.decodedToken
    if(!req.body.parent) { // comment is a reply to a post
        var newComment = new Comment({
            content: comment,
            author: decodedToken.user.id,
            author_name: decodedToken.user.username,
            post: postId
        })
        const post = await Post.findById(newComment.post)
        const newReplies = post.replies.concat(newComment._id)
        await Post.findByIdAndUpdate(newComment.post, {replies: newReplies})
    } else { // comment is a reply to a comment
        const parent = req.body.parent
        var newComment = new Comment({
            content: comment,
            author: decodedToken.user.id,
            author_name: decodedToken.user.username,
            post: postId,
            parent: parent
        })
        const parentComment = await Comment.findById(parent)
        const newReplies = parentComment.replies.concat(newComment._id)
        await Comment
            .findByIdAndUpdate(parent, {replies: newReplies})
        const post = await Post.findById(newComment.post)
        const newPostReplies = post.replies.concat(newComment._id)
        await Post.findByIdAndUpdate(newComment.post, {replies: newPostReplies})
    }
    try {
        await newComment.save()

        // add comments to users in DB
        const user = await User.findById(decodedToken.user._id)
        const newComments = user.comments.concat(newComment)
        await User
            .findByIdAndUpdate(decodedToken.user._id, {comments: newComments})
        res.send(newComment).status(201)
    } catch (err) {
        res.send("something went wrong").status(400)
    }
})

// delete comment
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const decodedToken = req.decodedToken
        if(comment && decodedToken.user.username === comment.author_name) {
            await Comment.findByIdAndDelete(comment.id)
            const post = await Post.findById(comment.post)
            const newPostReplies = post.replies
                .filter(reply => !reply._id.equals(comment._id))
            await Post
                .findByIdAndUpdate(comment.post, {replies: newPostReplies})
            if(comment.parent) {
                const parentComment = await Comment.findById(comment.parent)
                const parentReplies = parentComment.replies
                const newParentReplies = parentReplies
                    .filter(reply => !reply._id.equals(comment._id))
                await Comment.findByIdAndUpdate(parentComment._id, 
                    {replies: newParentReplies})
            }
            // TODO do something about replies not being deleted from DB
            // if parent comment gets deleted 

            // remove comment from users in DB
            const user = await User.findById(decodedToken.user._id)
            const newComments= user.comments.filter(c => !c.equals(comment._id))
            await User
                .findByIdAndUpdate(decodedToken.user._id, {comments: newComments})
            res.send("comment deleted").status(204)
        } else {
            res.send("comment not found").status(404)
        }
        
    } catch (err) {
        res.send("something went wrong").status(400)
    }
})

// vote comment
router.put("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const decodedToken = req.decodedToken
        if(req.body.vote === 1) {
            // like
            const newLikes = comment.likes.concat(decodedToken.user._id)
            await Comment.findByIdAndUpdate(req.params.id, {likes: newLikes})
            res.json({...comment, likes: newLikes}).status(200)
        } else {
            // dislikes
            const newDislikes = comment.dislikes.concat(decodedToken.user._id)
            await Comment
                .findByIdAndUpdate(req.params.id, {dislikes: newDislikes})
            res.json({...comment, dislikes: newDislikes}).status(200)
        }
    } catch (err) {
        res.send("could not like comment").status(400)
    }
})

// remove a vote from comment
router.put("/:id/remove", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const decodedToken = req.decodedToken
        if(req.body.vote === 1) {
            // remove like
            const newLikes = comment.likes
                .filter(comment => !comment.equals(decodedToken.user._id))
            await Comment.findByIdAndUpdate(req.params.id, {likes: newLikes})
            res.json({...comment, likes: newLikes}).status(200)
        } else {
            // remove dislike
            const newDislikes = comment.dislikes
                .filter(comment => !comment.equals(decodedToken.user._id))
            await Comment
                .findByIdAndUpdate(req.params.id, {dislikes: newDislikes})
            res.json({...comment, dislikes: newDislikes}).status(200)
        }
    } catch (err) {
        res.send("could not remove like from comment").status(400)
    }
})

module.exports = router