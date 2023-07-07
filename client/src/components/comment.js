import commentService from "../services/comments"
import { useState } from "react"
import { dateFormatter } from "../util/util"

const ReplyForm = ({parentId, postId}) => {
    const [replyOpened, setReplyOpened] = useState(false)
    const [displayStyle, setDisplayStyle] = useState("none")

    const replyStyle = {
        display: displayStyle
    }

    const handleReply = () => {
        setReplyOpened(!replyOpened)
        if(replyOpened === false) {
            setDisplayStyle("block")
        } else {
            setDisplayStyle("none")
        }
    }

    const handleSubmit = async (event) => {
        const comment = {
            content: event.target.content.value,
            parent: parentId
        }
        const res = await commentService
            .postComment(comment, window.localStorage.getItem("token"), postId)
    }

    return (
        <div>
            <button onClick={handleReply}></button>
            <div style={replyStyle}>
                <form onSubmit={handleSubmit}>
                    <textarea name="content"></textarea>
                    <button type="submit">send</button>
                </form>
            </div>
        </div>
    )
}

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
                    {comment.author_name} {dateFormatter(comment.date)} &nbsp; 
                    comment id: {comment._id} <br/>
                    parent comment: {comment.parent} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                    <button onClick={handleDelete}>remove</button>
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>
            )
        } else {
            // user is not the comment author
            return (
                <div style={replyStyle}>
                    {comment.author_name} {dateFormatter(comment.date)} &nbsp; 
                    comment id: {comment._id} <br/>
                    parent comment: {comment.parent} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>
            )
        }
        
    } else { // comment is a reply to the post
        if(comment.author_name === window.localStorage.getItem("username")) {
            // user is the comment author
            return (
                <div style={tempStyle}>
                    {comment.author_name} {dateFormatter(comment.date)} &nbsp; 
                    comment id: {comment._id} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                    <button onClick={handleDelete}>remove</button>
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>
            )
        } else {
            // user is not the comment author
            return (
                <div style={tempStyle}>
                    {comment.author_name} {dateFormatter(comment.date)} &nbsp; 
                    comment id: {comment._id} <br/>
                    <p>{comment.content}</p>
                    {likes.length - dislikes.length} likes &nbsp;
                    <button onClick={handleLike}>like</button>
                    <button onClick={handleDislike}>dislike</button>
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>
            )
        }
    }
}
    
export default Comment