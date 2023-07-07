import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const [username, setUsername] 
        = useState(window.localStorage.getItem("username"))

    const handlelogin = () => {
        navigate("/login")
    }

    const handleLogout = () => {
        window.localStorage.clear()
        navigate("/")
        setUsername(null)
    }

    if(username) {
        return (
            <div>
                <span>
                    <Link to={"/"}>forum.io</Link> &nbsp;
                </span>
                <span>
                    logged in as <strong>{username}</strong> &nbsp;
                    <Link to={`/user/${window.localStorage.getItem("username")}`}>
                        user info
                    </Link>
                </span>
                <button onClick={handleLogout}>logout</button>
            </div>
        )
    } else {
        return (
            <div>
                <span>
                    <Link to={"/"}>forum.io</Link> &nbsp;
                </span>
                <span>
                    <button onClick={handlelogin}>log in</button>
                </span>
            </div>
        )
    }
    
    
}

export default Navbar