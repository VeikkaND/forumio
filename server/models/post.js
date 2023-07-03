const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    content: String,
    likes: {type: Number, default: 0},
    author: {type: mongoose.Types.ObjectId, ref: "User"},
    subforum: {type: mongoose.Types.ObjectId, ref: "Subforum"},
    replies: [{type: mongoose.Types.ObjectId, ref: "Comment"}]
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post