require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const subforumsRouter = require("./routes/subforums")
const usersRouter = require("./routes/users")

const port = 3001
console.log(`Server running on port ${port}`)
mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use("/", subforumsRouter)
app.use("/users", usersRouter)

app.listen(port)
