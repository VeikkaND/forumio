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
        <div className="homepage">
            <button onClick={handleRedirect}>create new subforum</button>
            <div className="subforums">
                {subforums.map(sub => <Subforum name={sub.name} users={sub.users} 
                key={sub.id}/>)}
            </div>
        </div>
    )
}

export default Home