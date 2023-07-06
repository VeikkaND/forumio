import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import commentService from "../services/comments"
import postsService from "../services/posts"
import CommentForm from "../components/commentForm"
import Comment from "../components/comment"

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
            const data = await commentService.getAllCommentsOfPost(postId)
            const comments = data.sort((a , b) => {
                return b.likes.length - a.likes.length
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
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])

    useEffect(() => {
        async function getPost() {
            const post = await commentService.getPost(id)
            setPost(post)
            setLikes(post.likes)
            setDislikes(post.dislikes)
        }
        getPost()
    }, [])

    const handleLike = async () => {
        if(!likes.includes(window.localStorage.getItem("userid"))) {
            try {
                const res = await postsService
                    .votePost(post._id, 1, window.localStorage.getItem("token"))
                setLikes(res.likes)
                if(dislikes.includes(window.localStorage.getItem("userid"))) {
                    // remove dislike if user has disliked
                    const res = await postsService
                        .removeVote(post._id, -1, 
                            window.localStorage.getItem("token"))
                    setDislikes(res.dislikes)
                }
            } catch (err) {
                console.log("couldn't vote post")
            }
        }
    }
    const handleDislike = async () => {
        if(!dislikes.includes(window.localStorage.getItem("userid"))) {
            try {
                const res = await postsService
                    .votePost(post._id, -1, window.localStorage.getItem("token"))
                setDislikes(res.dislikes)
                if(likes.includes(window.localStorage.getItem("userid"))) {
                    // remove like if user has liked
                    const res = await postsService
                        .removeVote(post._id, 1, 
                            window.localStorage.getItem("token"))
                    setLikes(res.likes)
                }
            } catch (err) {
                console.log("couldn't vote post")
            }
        }
        
    }

    if(post) {
        return (
            <div>
                <Link to={`/${subforum}`}>return to {subforum}</Link>
                <h2>{post.title}</h2>
                by {post.author_name}
                <p>{post.content}</p>
                {likes.length - dislikes.length} likes &nbsp; 
                <button onClick={handleLike}>like</button>
                <button onClick={handleDislike}>dislike</button>
                <h4>comments</h4>
                <CommentForm postId={post._id}/>
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