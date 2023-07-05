import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = ({user}) => {
    const navigate = useNavigate()

    const handlelogin = () => {
        navigate("/login")
        // TODO fix bug where login button stays after navigation
    }

    const handleLogout = () => {
        window.localStorage.clear()
        navigate("/")
        // TODO fix bug where logout button stays after navigation
    }

    if(user) {
        return (
            <div>
                <span>
                    <Link to={"/"}>forum.io</Link> &nbsp;
                </span>
                <span>
                    user info here &nbsp;
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