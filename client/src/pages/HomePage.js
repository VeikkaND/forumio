import { useState, useEffect } from "react"
import Subforum from "../components/subforum"
import subforumService from "../services/subforums"
import { useNavigate } from "react-router-dom"

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
    }
    return ( // user hasn't logged in
        null
    )
    
}

export default Home