const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{type: mongoose.Types.ObjectId, ref: "Post"}],
    comments: [{type: mongoose.Types.ObjectId, ref: "Comment"}]
})

const User = mongoose.model("User", userSchema)

module.exports = User