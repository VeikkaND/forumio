import axios from "axios"

const getAllPostsOfSubforum = async (subforum) => {
    const res = await axios.get(`/api/posts/${subforum}/all`)
    return res.data
}

export default {getAllPostsOfSubforum}