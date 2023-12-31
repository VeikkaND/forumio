import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import postsService from "../services/posts"
import subforumsService from "../services/subforums"
import usersService from "../services/user"
import { formatToDays } from "../util/util"

const Post = ({post, subforum}) => {
    return (
        <div className="post">
            <Link to={`/${subforum}/${post._id}`}>{post.title}</Link>
            <br/>
            &nbsp; likes: {post.likes.length - post.dislikes.length} &nbsp; comments: {post.replies.length}
        </div>
    )
}

const NewPostForm = ({style, subforumInfo}) => {
    const handleSubmit = (event) => {
        const post = {
            title: event.target.title.value,
            content: event.target.content.value,
            subforum: subforumInfo.name
        }

        postsService.newPost(post, window.localStorage.getItem("token"))
    }

    return (
        <div className="posts" style={style}>
            <div className="postform">
                <form onSubmit={handleSubmit}>
                    <p>Title</p>
                    <input name="title" placeholder="Title"></input>
                    <p>Content</p>
                    <textarea name="content" placeholder="Content"></textarea>
                    <button type="submit">post</button>
                </form>
                
            </div>
        </div>
    )
}

const InfoBox = ({mod, subforumInfo}) => {
    const [subscribed, setSubscribed] = useState(subforumInfo.users
        .includes(window.localStorage.getItem("userid")))
    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate(`/${subforumInfo.name}/settings`)
    }

    const handleSub = async () => {
        setSubscribed(!subscribed)
        await Promise.all([
            subforumsService.subscribe(
                subforumInfo.name, 
                window.localStorage.getItem("token")
            ),
            usersService.subscribe(
                subforumInfo._id, 
                window.localStorage.getItem("token")
            )
        ])
    }

    const ModInfo = () => {
        const sub = subscribed ? "unsubscribe" : "subscribe"
        return (
            <>
                <p>{subforumInfo.description}</p> <br />
                <button onClick={handleSub}>{sub}</button>
                <p>created on: {formatToDays(subforumInfo.creationDate)} </p>
                <button onClick={handleRedirect}>settings</button>
            </> 
        )  
    }

    const UserInfo = () => {
        const sub = subscribed ? "unsubscribe" : "subscribe"
        return (
            <>
                <p>{subforumInfo.description}</p> <br />
                <button onClick={handleSub}>{sub}</button>
                <p>created on: {formatToDays(subforumInfo.creationDate)} </p>
            </> 
        )   
    }

    if(mod) {
        return (
            <div>
                <ModInfo />
            </div>
        )
    }
    return (
        <div>
            <UserInfo />
        </div>
    )
}

const SubforumPage = () => {
    const {subforum} = useParams()
    const [posts, setPosts] = useState([])
    const [subforumInfo, setSubforumInfo] = useState(null)
    const [newPostOpened, setNewPostOpened] = useState(false)

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

    if(newPostOpened) {
        var newPostStyle = {
            "display": "block"
        }
    } else {
        var newPostStyle = {
            "display": "none"
        }
    }

    const handleOpenForm = () => {
        setNewPostOpened(!newPostOpened)
    }

    if(subforumInfo.moderators.includes(window.localStorage.getItem("userid"))) {
        // UI with mod role
        return (
            <div className="subforumpage">
                <div className="posts">
                    <button onClick={handleOpenForm}>new post</button>
                    <NewPostForm subforumInfo={subforumInfo} style={newPostStyle} />
                    {posts.map(post => <Post post={post} subforum={subforum} 
                        key={post._id}/>)}
                </div>
                <div className="info">
                    <h2>{subforum}</h2>
                    <InfoBox mod={true} subforumInfo={subforumInfo}/>
                </div>
        </div>
        )
    }

    return (
        // UI with no mod role
        <div className="subforumpage">
            <div className="posts">
                <button onClick={handleOpenForm}>new post</button>
                <NewPostForm subforumInfo={subforumInfo} style={newPostStyle} />
                {posts.map(post => <Post post={post} subforum={subforum} 
                    key={post._id}/>)}
            </div>
            <div className="info">
                <h2>{subforum}</h2>
                <InfoBox mod={false} subforumInfo={subforumInfo}/>
            </div>
        </div>
    )
}

export default SubforumPage