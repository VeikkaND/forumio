const express = require("express")
const router = express.Router()
const Subforum = require("../models/subforum")
const Post = require("../models/post")
const Comment = require("../models/comment")
const User = require("../models/user")

//get all subforums
router.get("/", async (req, res) => {
    const subforums = await Subforum.find({})
    res.json(subforums)
})

//get subforum with name
router.get("/:subforum", async (req, res) => {
    const subforum = await Subforum.findOne({name: req.params.subforum})
    if(subforum.length !== 0) {
        res.json(subforum)
    } else {
        res.send("404 not found").status(404)
    }
})

// subforum creation
router.post("/", async (req, res) => {
    const request = req.body
    const decodedToken = req.decodedToken
    if(decodedToken) {
        const newSubforum = new Subforum({
            name: request.name,
            author: decodedToken.user._id,
            description: request.description,
            users: decodedToken.user._id,
            moderators: decodedToken.user._id,
            creationDate: req.timestamp
        })
        try {
            await newSubforum.save()
            res.json(newSubforum).status(201)
        } catch (err) {
            res.status(400)
        }
    } else {
        res.send("incerrect authentication").status(400)
    }
    
    
})

//delete subforum with name
// TODO delete posts and comments from database when deleting subforum 
router.delete(`/:subforum`, async (req, res) => {
    const subforum = await Subforum.findOne({name: req.params.subforum})
    const decodedToken = req.decodedToken
    if(subforum.moderators.includes(decodedToken.user._id)) {
        if(subforum) {
            try {
                if(subforum.posts.length > 0) { // if subforum has posts
                    // go through posts and delete them
                    subforum.posts.forEach(async p => {
                        const post = await Post.findById(p)
                        if(post.replies.length > 0) { // if post has comments
                            // delete comments of each post
                            post.replies.forEach(async c => {
                                const comment = await Comment.findById(c)
                                await Comment.findByIdAndDelete(c)

                                //delete comment from user in DB
                                const user = await User.findById(comment.author)
                                const newUserComments = user.comments
                                    .filter(userC => !userC.equals(c))
                                await User
                                    .findByIdAndUpdate(comment.author, {
                                        comments: newUserComments
                                    })
                            })
                        }
                        // delete post from user in DB
                        const user = await User
                            .findById(post.author)
                        const newUserPosts = user.posts
                            .filter(userP => !userP.equals(p))
                        await User
                            .findByIdAndUpdate(post.author, {posts: newUserPosts})
                        
                            // delete post
                        await Post
                            .findByIdAndDelete(p)
                    })
                }
                await Subforum.findByIdAndDelete(subforum._id)
                res.status(204)
            } catch (err) {
                res.status(400)
            }
        } else {
            res.status(404)
        }
    } else {
        res.status(401)
    }
})

module.exports = router