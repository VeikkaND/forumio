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
            <div className="userpage">
                <h2>{user.username}</h2>
                <p>account created on: {dateFormatter(user.creationDate)}</p>
                <table className="data">
                    <tbody>
                        <tr>
                            <td>Posts</td>
                            <td>{user.posts.length}</td>
                        </tr>
                        <tr>
                            <td>Comments</td>
                            <td>{user.comments.length}</td>
                        </tr>
                    </tbody>
                </table>
                
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