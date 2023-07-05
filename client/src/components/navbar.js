import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = ({user}) => {
    const navigate = useNavigate()

    const handlelogin = () => {
        navigate("/login")
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