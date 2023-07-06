import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import postsService from "../services/posts"
import Popup from "reactjs-popup"

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

    const handleNewPost = (event) => {
        const post = {
            title: event.target.title.value,
            content: event.target.content.value,
            subforum: subforum
        }
        postsService.newPost(post, window.localStorage.getItem("token"))
    }

    useEffect(() => {
        async function getPosts() {
            const posts = await postsService.getAllPostsOfSubforum(subforum)
            setPosts(posts)
        } 
        getPosts()
    }, [])

    return (
        <div>
            <h2>{subforum}</h2>
            <Popup trigger={<button>new post</button>} position={"bottom left"}>
                <div>
                    <form onSubmit={handleNewPost}>
                        <p>Title</p>
                        <input name="title"></input> <br/>
                        <p>Content</p>
                        <textarea name="content"></textarea>
                        <button type="submit"></button>
                    </form>
                </div>
            </Popup>
            {posts.map(post => <Post post={post} subforum={subforum} 
                key={post._id}/>)}
        </div>
    )
}

export default SubforumPage