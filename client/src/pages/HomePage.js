import { useState, useEffect } from "react"
import Subforum from "../components/subforum"
import subforumService from "../services/subforums"
import { useNavigate } from "react-router-dom"
import SideNav from "../components/sidenav"

const Home = () => {
    const [subforums, setSubforums] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getSubs() {
            const subs = await subforumService.getSubforums()
            setSubforums(subs)
        }
        getSubs()
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
                <div>
                    <button onClick={handleCreate}>create new subforum</button>
                    <button onClick={handleAll}>browse all subforums</button>
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