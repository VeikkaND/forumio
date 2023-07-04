import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <span>
                <Link to={"/"}>forum.io</Link> &nbsp;
            </span>
            <span>
                login here &nbsp;
            </span>
        </div>
    )
    
}

export default Navbar