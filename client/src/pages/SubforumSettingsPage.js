import { useEffect, useState } from "react"
import subforumsService from "../services/subforums"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const SubforumSettingsPage = () => {
    const {subforum} = useParams()
    const [subforumInfo, setSubforumInfo] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function getSubforum() {
            const res = await subforumsService.getSubforum(subforum)
            setSubforumInfo(res)
        }
        getSubforum()
    })

    const handleDelete = async () => {
        // TODO fix delted sub still showing on homepage sometimes
        navigate("/")
        const res = await subforumsService
            .deleteSubforum(subforum, window.localStorage.getItem("token"))
    }

    if(subforumInfo) {
        return (
            <div>
                <Link to={`/${subforum}`}>back</Link> <br/>
                {subforumInfo.name} <br/>
                <button onClick={handleDelete}>delete subforum</button>
            </div>
        )
    }
    return (
        <div>
            loading subforum settings...
        </div>
    )
}

export default SubforumSettingsPage