const mongoose = require("mongoose")
const Schema = mongoose.Schema

const subforumSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    author: mongoose.Types.ObjectId,
    users: [{type: mongoose.Types.ObjectId, ref: "User"}],
    moderators: [{type: mongoose.Types.ObjectId, ref: "User"}],
    posts: [{type: mongoose.Types.ObjectId, ref: "Post"}],
    creationDate: Date
})

const Subforum = mongoose.model("Subforum", subforumSchema)

module.exports = Subforum