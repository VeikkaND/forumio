import commentService from "../services/comments"
import { useState } from "react"
import { dateFormatter } from "../util/util"
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri"

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
        <div className="replyform">
            <button onClick={handleReply}>reply</button>
            <div style={replyStyle} className="form">
                <form onSubmit={handleSubmit}>
                    <textarea name="content" rows={4} cols={50} 
                    placeholder="Write something here"></textarea>
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

    const handleScroll = async (event) => {
        event.preventDefault()
    }

    // TODO clean this vvv and make replies under replies
    const tempStyle = {
        margin: 5,
        marginLeft: 10
    }

    // coloring for likes
    if(likes.includes(window.localStorage.getItem("userid"))) {
        var likeStyle = {
            fill: "#19A7CE"
        }
    } else {
        var likeStyle = {
            fill: "black"
        }
    }

    if(dislikes.includes(window.localStorage.getItem("userid"))) {
        var dislikeStyle = {
            fill: "red"
        }
    } else {
        var dislikeStyle = {
            fill: "black"
        }
    }

    if(comment.parent) { // comment is a reply to a comment
        const replyStyle = {...tempStyle, marginLeft: comment.depth * 20}
        if(comment.author_name === window.localStorage.getItem("username")) {
            // user is the comment author
            return (
                <div style={replyStyle} className="comment">
                    <span id="header">
                        <a href={`/user/${comment.author_name}`}>
                            u/{comment.author_name}
                        </a>
                        {dateFormatter(comment.date)}
                    </span>
                    <p>{comment.content}</p>
                    <RiArrowUpLine onClick={handleLike} style={likeStyle} 
                            id="like"/> 
                    {likes.length - dislikes.length} 
                    <RiArrowDownLine onClick={handleDislike} 
                        style={dislikeStyle} id="dislike"/> 
                    <button onClick={handleDelete}>delete</button>
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>  
            )
        } else {
            // user is not the comment author
            return (
                <div style={replyStyle} className="comment">
                    <span id="header">
                        <a href={`/user/${comment.author_name}`}>
                            u/{comment.author_name}
                        </a>
                        {dateFormatter(comment.date)}
                    </span>
                    <p>{comment.content}</p>
                    <RiArrowUpLine onClick={handleLike} style={likeStyle} 
                            id="like"/> 
                    {likes.length - dislikes.length} 
                    <RiArrowDownLine onClick={handleDislike} 
                        style={dislikeStyle} id="dislike"/> 
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>
            )
        }
        
    } else { // comment is a reply to the post
        if(comment.author_name === window.localStorage.getItem("username")) {
            // user is the comment author
            return (
                <div style={tempStyle} className="comment">
                    <span id="header">
                        <a href={`/user/${comment.author_name}`}>
                            u/{comment.author_name}
                        </a>
                        {dateFormatter(comment.date)}
                    </span>
                    <p>{comment.content}</p>
                    <RiArrowUpLine onClick={handleLike} style={likeStyle} 
                            id="like"/> 
                    {likes.length - dislikes.length} 
                    <RiArrowDownLine onClick={handleDislike} 
                        style={dislikeStyle} id="dislike"/> 
                    <button onClick={handleDelete}>delete</button>
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>
            )
        } else {
            // user is not the comment author
            return (
                <div style={tempStyle} className="comment">
                    <span id="header">
                        <a href={`/user/${comment.author_name}`}>
                            u/{comment.author_name}
                        </a>
                        {dateFormatter(comment.date)}
                    </span>
                    <p>{comment.content}</p>
                    <RiArrowUpLine onClick={handleLike} style={likeStyle} 
                            id="like"/> 
                    {likes.length - dislikes.length} 
                    <RiArrowDownLine onClick={handleDislike} 
                        style={dislikeStyle} id="dislike"/> 
                    <ReplyForm parentId={comment._id}
                        postId={comment.post}/>
                </div>
            )
        }
    }
}
    
export default Comment