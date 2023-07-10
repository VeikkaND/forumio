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
    useEffect(() => {
        async function getSubbedSubs() {
            const subs = await subforumsService
                .getSubbedSubforums(window.localStorage.getItem("userid"))
            setSubscribedSubs(subs)
        }
        getSubbedSubs()
    }, [])

    if(subscribedSubs.length > 0) {
        return (
            <div className="sidenav">
                <h3>Subscribed</h3>
                {subscribedSubs.map(sub => 
                    <SubShort sub={sub} key={sub._id}/>
                )}
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