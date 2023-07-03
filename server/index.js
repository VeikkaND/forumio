require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const subforumsRouter = require("./routes/subforums")
const usersRouter = require("./routes/users")
const postsRouter = require("./routes/posts")
const commentsRouter = require("./routes/comments")

const port = 3001
console.log(`Server running on port ${port}`)
mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cors())

app.use("/api/subforums", subforumsRouter)
app.use("/api/users", usersRouter)
app.use("/api/posts", postsRouter)
app.use("/api/comments", commentsRouter)

app.listen(port)
