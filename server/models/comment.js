const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: String,
    author: {type: mongoose.Types.ObjectId, ref: "User"},
    author_name: String,
    likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
    dislikes: [{type: mongoose.Types.ObjectId, ref: "User"}],
    post: {type: mongoose.Types.ObjectId, ref: "Post"},
    parent: {type: mongoose.Types.ObjectId, ref: "Comment"},
    replies: [{type: mongoose.Types.ObjectId, ref: "Comment"}],
    date: Date
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment