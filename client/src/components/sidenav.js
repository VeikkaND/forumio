import { useEffect, useState } from "react"
import subforumsService from "../services/subforums"
import { useNavigate } from "react-router-dom"

const SubShort = ({sub}) => {
    const navigate = useNavigate()
    const handleRedirect = () => {
        navigate(`/${sub.name}`)
    }

    return (
        <div className="subshort" onClick={handleRedirect}>
            <a href={`/${sub.name}`}>{sub.name}</a>
        </div>
    )
}

const SideNav = () => {
    const [subscribedSubs, setSubscribedSubs] = useState([]) 
    const navigate = useNavigate()
    const userid = window.localStorage.getItem("userid")

    useEffect(() => {
        if(userid) {
            async function getSubbedSubs() {
                const subs = await subforumsService
                    .getSubbedSubforums(window.localStorage.getItem("userid"))
                setSubscribedSubs(subs)
            }
            getSubbedSubs()
        }
    }, [])

    const handleCreate = () => {
        navigate("/create")
    }

    const handleAll = () => {
        navigate("/all")
    }

    if(subscribedSubs.length > 0 && userid) {
        return (
            <div className="sidenav">
                <h3>Subscribed</h3>
                {subscribedSubs.map(sub => 
                    <SubShort sub={sub} key={sub._id}/>
                )}
                <button onClick={handleAll} id="all">All Subforums</button> <br/>
                <button onClick={handleCreate}>New Subforum</button>
            </div>
        )
    } else if (!userid) {
        return (
            <div className="sidenav">
                <h3>Subscribed</h3>
                <div className="login">
                    <a href="/login">login to subscribe</a>
                </div>
            </div>
        )
    }
    return (
        <div className="sidenav">
            <p>loading</p>
        </div>
    )
}

export default SideNav