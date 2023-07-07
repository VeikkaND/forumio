import { useParams } from "react-router-dom"
import usersService from "../services/user"
import { useEffect, useState } from "react"
import { dateFormatter } from "../util/util"

const UserPage = () => {
    const {username} = useParams() 
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        async function getUser() {
            const res = await usersService.getUser(username)
            setUser(res)
        }
        getUser()
    }, [])

    if(user) {
        return (
            <div>
                <h2>{user.username}</h2>
                posts: {user.posts.length} <br/>
                comments: {user.comments.length} <br/>
                account created on: {dateFormatter(user.creationDate)} <br/>
            </div>
        )
    } 
    return (
        <div>
            404 not found
        </div>
    )
}

export default UserPage