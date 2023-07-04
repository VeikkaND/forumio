import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Comment = ({comment}) => {
    const [likes, setLikes] = useState(comment.likes)
    const handleLike = async () => {
        try {
            const res = await axios
                .put(`/api/comments/${comment._id}`, {vote: 1})
            setLikes(res.data.likes)
        } catch (err) {
            console.log("couldn't vote comment")
        }
        
    }
    const handleDislike = async () => {
        try {
            const res = await axios
                .put(`/api/comments/${comment._id}`, {vote: -1})
            setLikes(res.data.likes)
        } catch (err) {
            console.log("couldn't vote comment")
        }
    }

    // TODO clean this vvv and make replies under replies
    const tempStyle = {
        border: "solid 1px",
        margin: 5,
        marginLeft: 10
    }
    if(comment.parent) {
        const replyStyle = {...tempStyle, marginLeft: comment.depth * 10}
        return (
            <div style={replyStyle}>
                {comment.author_name} &nbsp; comment id: {comment._id} <br/>
                parent comment: {comment.parent} <br/>
                <p>{comment.content}</p>
                {likes} likes &nbsp;
                <button onClick={handleLike}>like</button>
                <button onClick={handleDislike}>dislike</button>
            </div>
        )
    }
    return (
        <div style={tempStyle}>
            {comment.author_name} &nbsp; comment id: {comment._id} <br/>
            <p>{comment.content}</p>
            {likes} likes &nbsp;
            <button onClick={handleLike}>like</button>
            <button onClick={handleDislike}>dislike</button>
        </div>
    )
}

const Comments = ({postId}) => {
    const [comments, setComments] = useState([])
    let depth = 2 

    const replyRecursion = (
        reply, parentComment, orderedComments, replyComments) => {
        if(typeof(reply) === "string") {
            reply = replyComments.find(r => r._id === reply)
        }
        reply.depth = depth
        orderedComments.push(reply)
        if(reply.replies.length !== 0) {
            reply.replies.forEach(r => {
                depth += 1
                replyRecursion(r, reply, orderedComments, replyComments)
            })
        }
    }

    useEffect(() => {
        async function getAllComments() {
            const res = await axios.get(`/api/comments/${postId}/all`)
            const comments = res.data.sort((a , b) => {
                return b.likes - a.likes
            })
            const parentComments = comments.filter(comment => !comment.parent)
            const replyComments = comments.filter(comment => comment.parent)
            let orderedComments = [] 
            parentComments.forEach(parentComment => {
                orderedComments.push(parentComment)
                parentComment.replies
                    .forEach(reply => {
                        depth = 2
                        replyRecursion(
                            reply, parentComment, orderedComments, replyComments)
                })
            })

            setComments(orderedComments)
        }
        getAllComments()
    }, [])
    if(comments.length > 0) {
        return (
            <div>
                {comments.map(comment => <Comment comment={comment} 
                    key={comment._id}/> )}
            </div>
        )
    }
    return (
        <p>write a comment</p>
    )
}

const Post = () => {
    const {subforum, id} = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        async function getPost() {
            const res = await axios.get(`/api/posts/${id}`)
            setPost(res.data)
        }
        getPost()
    }, [])

    if(post) {
        return (
            <div>
                <Link to={`/${subforum}`}>return to {subforum}</Link>
                <h2>{post.title}</h2>
                by {post.author_name}
                <p>{post.content}</p>
                {post.likes} likes
                <h4>comments</h4>
                <Comments postId={post._id}/>
            </div>
        )
    }
    return (
        <div>
            loading post...
        </div>
    )
}

export default Post