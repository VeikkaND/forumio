import { useState, useEffect } from "react"
import Subforum from "../components/subforum"
import subforumService from "../services/subforums"
import postsService from "../services/posts"
import { useNavigate } from "react-router-dom"
import SideNav from "../components/sidenav"

const PostShort = ({post, subforums}) => {
    const navigate = useNavigate()
    const subforum = subforums.find(sub => sub.id === post.subforum)

    const handleRedirect = (event) => {
        // only redirect to post if not clicking the subforum name
        if(event.target.id !== "subname") {
            navigate(`/${subforum.name}/${post._id}`)
        }
    }

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

            const userid = window.localStorage.getItem("userid")
            const token = window.localStorage.getItem("token")

            if(userid && token) {
                // user signed in
                const posts = await postsService
                    .get50Posts(
                        window.localStorage.getItem("userid"), 
                        window.localStorage.getItem("token")
                    )
                setPosts(posts)
            } else {
                // user not signed in
                const posts = await postsService
                    .get50PostsAny()
                setPosts(posts)
            }
        }
        getSubsAndPosts()
    }, [])


    if(window.localStorage.getItem("token")) { // user is logged in

        return (
            <div className="home">
                <SideNav />
                <div className="latestsposts">
                    <div className="posts">
                        {posts.map(post => 
                            <PostShort post={post} subforums={subforums} 
                                key={post._id}/>
                        )}
                    </div>
                    <div className="all">
                        <span>
                            Want to see more? &nbsp;
                            <a href="/all">Browse all subforums</a>
                        </span>
                    </div>
                    
                </div>
            </div>
            
        )
    }
    return ( 
        <div className="home">
            <SideNav />
            <div className="latestsposts">
                <div className="posts">
                    {posts.map(post => 
                        <PostShort post={post} subforums={subforums} 
                            key={post._id}/>
                    )}
                </div>
                <div className="all">
                    <span>
                        Want to see more? &nbsp;
                        <a href="/all">Browse all subforums</a>
                    </span>
                </div>
            </div>
        </div>
    )
    
}

export default Home