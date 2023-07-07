import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import postsService from "../services/posts"
import subforumsService from "../services/subforums"
import Popup from "reactjs-popup"

const Post = ({post, subforum}) => {
    return (
        <div>
            <Link to={`/${subforum}/${post._id}`}>{post.title}</Link>
            <br/>
            &nbsp; likes: {post.likes.length - post.dislikes.length} &nbsp; comments: {post.replies.length}
        </div>
    )
}

const InfoBox = ({mod, subforumInfo}) => {
    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate(`/${subforumInfo.name}/settings`)
    }

    if(mod) {
        return (
            <div>
                some info here <br/>
                <button onClick={handleRedirect}>settings</button>
            </div>
        )
    }
    return (
        <div>
            some info here
        </div>
    )
}

const SubforumPage = () => {
    const {subforum} = useParams()
    const [posts, setPosts] = useState([])
    const [subforumInfo, setSubforumInfo] = useState(null)

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
        async function getSubforumInfo() {
            const sub = await subforumsService.getSubforum(subforum)
            setSubforumInfo(sub)
        }
        getPosts()
        getSubforumInfo()
    }, [])

    if(!subforumInfo) {
        return (
            <div>
                Loading subforum...
            </div>
        )
    }

    if(subforumInfo.moderators.includes(window.localStorage.getItem("userid"))) {
        // UI with mod role
        return (
            <div>
                <h2>{subforum}</h2>
                <InfoBox mod={true} subforumInfo={subforumInfo}/>
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

    return (
        // UI with no mod role
        <div>
            <h2>{subforum}</h2>
            <InfoBox mod={false} subforumInfo={subforumInfo}/>
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