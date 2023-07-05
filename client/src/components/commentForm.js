import { useState } from "react"
import commentService from "../services/comments"

const CommentForm = ({postId}) => {
    const [comment, setComment] = useState("")

    const handleInput = (event) => {
        event.preventDefault()
        setComment(event.target.value)
    }

    const handleSubmit = (event) => {
        commentService.postComment(
            comment, window.localStorage.getItem("token"), postId
        )
        // TODO update PostPage.js setComments() with new comments
    }

    return (
        <div>
            <textarea onChange={handleInput}/>
            <button onClick={handleSubmit}>send</button>
        </div>
    )
}

export default CommentForm