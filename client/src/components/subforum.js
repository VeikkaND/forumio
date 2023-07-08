import { Link } from "react-router-dom"

const Subforum = ({name, users}) => {
    return (
        <div className="subforum">
            <Link to={`/${name}`} id="sublink">{name}</Link>
            <p>{users} users</p>
        </div>
    )
}

export default Subforum