import axios from "axios"
import { useParams } from "react-router-dom"

const SubforumPage = () => {
    const {subforum} = useParams()
    return (
        <div>
            {subforum}
        </div>
    )
}

export default SubforumPage