const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    content: String,
    likes: Number,
    author: mongoose.Types.ObjectId,
    replies: [mongoose.Types.ObjectId]
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post