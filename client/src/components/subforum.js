import { Link } from "react-router-dom"

const Subforum = ({name, users}) => {
    return (
        <div>
            <Link to={`/${name}`}>{name}</Link>
            <ul>
                <li>{users} users</li>
            </ul>
        </div>
    )
}

export default Subforum