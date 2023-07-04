import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Comment = ({comment}) => {
    return (
        <div>
            {comment.author}
            <p>{comment.content}</p>
            parent comment: {comment.parent} <br/>
            {comment.likes} likes
        </div>
    )
}

const Comments = ({postId}) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        async function getAllComments() {
            const res = await axios.get(`/api/comments/${postId}/all`)
            setComments(res.data)
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