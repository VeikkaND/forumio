import { useState, useEffect } from "react"
import Subforum from "../components/subforum"
import subforumService from "../services/subforums"
import postsService from "../services/posts"
import { useNavigate } from "react-router-dom"
import SideNav from "../components/sidenav"

const PostShort = ({post, subforums}) => {
    const navigate = useNavigate()
    const subforum = subforums.find(sub => sub.id === post.subforum)

    const handleRedirect = () => {
        navigate(`/${subforum.name}/${post._id}`)
    }

    // TODO fix clicking on link redirecting first to handleRedirect
    return (
        <div className="postshort" onClick={handleRedirect}>
            <span id="headers">
                {post.title}
                <a id="subname" href={`/${subforum.name}`}>
                    /{subforum.name}
                </a>
            </span>
            <span id="likes">
                <p>likes: {post.likes.length - post.dislikes.length}</p>
            </span>
        </div>
    )
}

const Home = () => {
    const [subforums, setSubforums] = useState([])
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getSubsAndPosts() {
            const subs = await subforumService.getSubforums()
            setSubforums(subs)

            const posts = await postsService
                .get50Posts(
                    window.localStorage.getItem("userid"), 
                    window.localStorage.getItem("token")
                )
            setPosts(posts)
        }
        getSubsAndPosts()
    }, [])

    const handleCreate = () => {
        navigate("/create")
    }

    const handleAll = () => {
        navigate("/all")
    }

    if(window.localStorage.getItem("token")) { // user is logged in
        // TODO some posts in the middle

        return (
            <div className="home">
                <SideNav />
                <div className="latestsposts">
                    <button onClick={handleCreate}>create new subforum</button>
                    <button onClick={handleAll}>browse all subforums</button>
                    <div className="posts">
                        {posts.map(post => 
                            <PostShort post={post} subforums={subforums} 
                                key={post._id}/>
                        )}
                    </div>
                </div>
            </div>
            
        )

        /*
        return (
            <div className="homepage">
                <button onClick={handleCreate}>create new subforum</button>
                <button onClick={handleAll}>browse all subforums</button>
                <div className="subforums">
                    {subforums.map(sub => <Subforum name={sub.name} users={sub.users} 
                    key={sub.id}/>)}
                </div>
            </div>
        )
        */
    }
    return ( // user hasn't logged in
        // TODO show something for users that aren't logged in
        null
    )
    
}

export default Home