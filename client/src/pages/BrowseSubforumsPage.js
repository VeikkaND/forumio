import { useState, useEffect } from "react"
import Subforum from "../components/subforum"
import subforumService from "../services/subforums"

const BrowseSubforumsPage = () => {
    const [subforums, setSubforums] = useState([])

    useEffect(() => {
        async function getSubs() {
            const subs = await subforumService.getSubforums()
            setSubforums(subs)
        }
        getSubs()
    }, [])

    return (
        <div className="homepage">
            <div className="subforums">
                {subforums.map(sub => <Subforum name={sub.name} users={sub.users} 
                key={sub.id}/>)}
            </div>
        </div>
    )
}

export default BrowseSubforumsPage