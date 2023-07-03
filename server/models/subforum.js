const mongoose = require("mongoose")
const Schema = mongoose.Schema

const subforumSchema = new Schema({
    name: String,
    users: [mongoose.Types.ObjectId],
    posts: [mongoose.Types.ObjectId]
})

const Subforum = mongoose.model("Subforum", subforumSchema)

module.exports = Subforum