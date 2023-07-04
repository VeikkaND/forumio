import { useState, useEffect } from "react"
import Subforum from "../components/subforum"
import subforumService from "../services/subforums"

const Home = () => {
    const [subforums, setSubforums] = useState([])

    useEffect(() => {
        async function getSubs() {
        const subs = await subforumService.getSubforums()
        setSubforums(subs)
        }
        getSubs()
    }, [])
    return (
        <div>
            {subforums.map(sub => <Subforum name={sub.name} users={sub.users} 
            key={sub.id}/>)}
        </div>
    )
}

export default Home