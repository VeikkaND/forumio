import commentService from "../services/comments"
import { useState } from "react"

const Comment = ({comment}) => {
    const [likes, setLikes] = useState(comment.likes)
    const [dislikes, setDislikes] = useState(comment.dislikes)
    const handleLike = async () => {
        if(!likes.includes(window.localStorage.getItem("userid"))) {
            try {
                const res = await commentService
                    .voteComment(comment, 1, window.localStorage.getItem("token"))
                setLikes(res.likes)
                if(dislikes.includes(window.localStorage.getItem("userid"))) {
                    // remove dislike if user has disliked post
                    const res = await commentService
                        .removeVote(comment, -1, 
                            window.localStorage.getItem("token"))
                    setDislikes(res.dislikes)
                }
            } catch (err) {
                console.log("couldn't vote comment")
            }
        }
    }
    const handleDislike = async () => {
        if(!dislikes.includes(window.localStorage.getItem("userid"))) {
            try {
                const res = await commentService
                    .voteComment(comment, -1, window.localStorage.getItem("token"))
                setDislikes(res.dislikes)
                if(likes.includes(window.localStorage.getItem("userid"))) {
                    // remove like if user has liked post
                    const res = await commentService
                        .removeVote(comment, 1, 
                            window.localStorage.getItem("token"))
                    setLikes(res.likes)
                }
            } catch (err) {
                console.log("couldn't vote comment")
            }
        }
        
    }

    const handleDelete = async () => {
        const res = await commentService
            .deleteComment(comment._id, window.localStorage.getItem("token"))
        // TODO update rendered comments
    }

    // TODO clean this vvv and make replies under replies
    const tempStyle = {
        border: "solid 1px",
        margin: 5,
        marginLeft: 10
    }
    if(comment.parent) { // comment is a reply to a comment
        const replyStyle = {...tempStyle, marginLeft: comment.depth * 10}
        if(comment.author_name === window.localStorage.getItem("username")) {
            // user is the comment author
            return (
                <div style={replyStyle}>
                    {comment.author_name} &nbsp; comment id: {comment._id} <br/>
                    parent comment: {comment.parent} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                    <button onClick={handleDelete}>remove</button>
                </div>
            )
        } else {
            return (
                <div style={replyStyle}>
                    {comment.author_name} &nbsp; comment id: {comment._id} <br/>
                    parent comment: {comment.parent} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                </div>
            )
        }
        
    } else { // comment is a reply to the post
        if(comment.author_name === window.localStorage.getItem("username")) {
            // user is the comment author
            return (
                <div style={tempStyle}>
                    {comment.author_name} &nbsp; comment id: {comment._id} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                    <button onClick={handleDelete}>remove</button>
                </div>
            )
        } else {
            return (
                <div style={tempStyle}>
                    {comment.author_name} &nbsp; comment id: {comment._id} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                </div>
            )
        }
    }
}
    
export default Comment