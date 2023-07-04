import { useState } from "react"

const CommentForm = () => {
    const [comment, setComment] = useState("")

    const handleInput = (event) => {
        event.preventDefault()
        setComment(event.target.value)
    }

    const handleSubmit = (event) => {
        // TODO after login, use login details for new comment
    }

    return (
        <div>
            <textarea onChange={handleInput}/>
            <button onClick={handleSubmit}>send</button>
        </div>
    )
}

export default CommentForm