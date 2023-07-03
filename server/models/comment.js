const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: String,
    author: mongoose.Types.ObjectId,
    likes: Number,
    replies: [mongoose.Types.ObjectId]
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment