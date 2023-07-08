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
            <div className="navbar">
                <span>
                    <Link to={"/"} id="logo">
                        <span id="forum">forum</span>
                        <span id="io">.io</span>
                    </Link> 
                </span>
                <span id="user">
                    <Link to={`/user/${window.localStorage.getItem("username")}`} 
                    id="userlink">
                        {username}
                    </Link> &nbsp;
                    <button onClick={handleLogout}>logout</button>
                </span>
                
            </div>
        )
    } else {
        return (
            <div className="navbar">
                <span>
                    <Link to={"/"} id="logo">
                        <span id="forum">forum</span>
                        <span id="io">.io</span>
                    </Link> 
                </span>
                <span id="user">
                    <button onClick={handlelogin}>log in</button>
                </span>
            </div>
        )
    }
    
    
}

export default Navbar