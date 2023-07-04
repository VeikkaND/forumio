import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Post = () => {
    const {subforum, id} = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        async function getPost() {
            const res = await axios.get(`/api/posts/${id}`)
            setPost(res.data)
        }
        getPost()
    }, [])

    return (
        <div>
            <Link to={`/${subforum}`}>return to {subforum}</Link>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.likes} likes
            <h4>comments</h4>

        </div>
    )
}

export default Post