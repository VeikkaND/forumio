import axios from "axios"

const getSubforums = async () => {
    const res = await axios.get("/api/subforums" )
    const subforumsData = res.data
    let subforums = []
    subforumsData.forEach(sub => {
        const subforum = {
            name: sub.name,
            users: sub.users.length,
            id: sub._id
        }
        subforums = subforums.concat(subforum)
    })
    return subforums
}

const getSubforum = async (name) => {
    const res = await axios.get(`/api/subforums/${name}`)
    return res.data
}

const newSubforum = async (subforum, token) => {
    const res = await axios.post("/api/subforums", subforum, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data
}

const deleteSubforum = async (name, token) => {
    const res = await axios.delete(`/api/subforums/${name}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data
}

const subscribe = async (name, token) => {
    const res = await axios.put(`/api/subforums/${name}`, null , {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data
}

export default {
    getSubforums, 
    getSubforum, 
    newSubforum, 
    deleteSubforum,
    subscribe
}