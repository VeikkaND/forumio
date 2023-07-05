const router = require("express").Router()
require("dotenv").config()
const Comment = require("../models/comment")
const Post = require("../models/post")
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
    const authorization = req.headers.authorization
    if(authorization.startsWith("Bearer ")) {
        const token = authorization.replace("Bearer ", "")
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!decodedToken.user.parent) {
            var newComment = new Comment({
                content: comment,
                author: decodedToken.user.id,
                author_name: decodedToken.user.username,
                post: postId
            })
            const post = await Post.findById(newComment.post)
            const newReplies = post.replies.concat(newComment._id)
            await Post.findByIdAndUpdate(newComment.post, {replies: newReplies})
        } else {
            var newComment = new Comment({
                content: comment,
                author: decodedToken.user.authorId,
                author_name: decodedToken.user.author_name,
                post: postId,
                //parent: TODO set parent when replying to comment
            })
            // fix this parent too vvvvv
            const parentComment = await Comment.findById(decodedToken.user.parent)
            const newReplies = parentComment.replies.concat(newComment._id)
            // and this parent
            await Comment
                .findByIdAndUpdate(decodedToken.user.parent, {replies: newReplies})
            const post = await Post.findById(newComment.post)
            const newPostReplies = post.replies.concat(newComment._id)
            await Post.findByIdAndUpdate(newComment.post, {replies: newPostReplies})
        }
        try {
            newComment.save()
            res.send(newComment).status(201)
        } catch (err) {
            res.send("something went wrong").status(400)
        }
    } else {
        res.send("Wrong authentication").status(401)
    }
    
})

// delete comment
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if(comment) {
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
            res.send("comment deleted").status(204)
        } else {
            res.send("comment not found").status(404)
        }
        
    } catch (err) {
        res.send("something went wrong").status(400)
    }
})

// like comment
router.put("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const newLikes = comment.likes += req.body.vote
        await Comment.findByIdAndUpdate(req.params.id, {likes: newLikes})
        res.json({...comment, likes: newLikes}).status(200)
    } catch (err) {
        res.send("could not like comment").status(400)
    }
})

module.exports = router