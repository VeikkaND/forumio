import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Post = ({post, subforum}) => {
    return (
        <div>
            <Link to={`/${subforum}/${post._id}`}>{post.title}</Link>
            <br/>
            &nbsp; likes: {post.likes} &nbsp; comments: {post.replies.length}
        </div>
    )
}

const SubforumPage = () => {
    const {subforum} = useParams()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function getPosts() {
            const res = await axios.get(`/api/posts/${subforum}/all`)
            const posts = res.data
            setPosts(posts)
        } 
        getPosts()
    }, [])

    return (
        <div>
            <h2>{subforum}</h2>
            {posts.map(post => <Post post={post} subforum={subforum} 
                key={post._id}/>)}
        </div>
    )
}

export default SubforumPage