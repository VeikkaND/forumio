const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    content: String,
    likes: [
        {type: mongoose.Types.ObjectId, ref: "User"}
    ],
    dislikes: [
        {type: mongoose.Types.ObjectId, ref: "User"}
    ],
    author: {type: mongoose.Types.ObjectId, ref: "User"},
    author_name: String,
    subforum: {type: mongoose.Types.ObjectId, ref: "Subforum"},
    replies: [{type: mongoose.Types.ObjectId, ref: "Comment"}],
    date: Date,
    latestComment: Date
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post