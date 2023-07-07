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

    const handleRedirect = () => {
        navigate("/create")
    }

    return (
        <div>
            <button onClick={handleRedirect}>create new subforum</button>
            {subforums.map(sub => <Subforum name={sub.name} users={sub.users} 
            key={sub.id}/>)}
        </div>
    )
}

export default Home