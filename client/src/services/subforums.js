import axios from "axios"

const API_URL = "http://localhost:3000/api/subforums" 

const getSubforums = async () => {
    const res = await axios.get(API_URL)
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

export default {getSubforums}