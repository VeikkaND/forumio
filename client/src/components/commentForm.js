import { useState } from "react"
import commentService from "../services/comments"

const CommentForm = ({postId}) => {
    const [comment, setComment] = useState("")

    const handleInput = (event) => {
        event.preventDefault()
        setComment(event.target.value)
    }

    const handleSubmit = (event) => {
        const com = {
            content: comment
        }
        commentService.postComment(
            com, window.localStorage.getItem("token"), postId)
        window.location.reload(false)
    }

    return (
        <div className="commentform">
            <textarea onChange={handleInput} rows={4}/>
            <button onClick={handleSubmit}>send</button>
        </div>
    )
}

export default CommentForm