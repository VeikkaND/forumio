const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String
    },
    posts: [{type: mongoose.Types.ObjectId, ref: "Post"}],
    comments: [{type: mongoose.Types.ObjectId, ref: "Comment"}],
    creationDate: Date,
    subscriptions: [{type: mongoose.Types.ObjectId, ref: "Subforum"}]
})

const User = mongoose.model("User", userSchema)

module.exports = User