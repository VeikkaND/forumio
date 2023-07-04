import axios from "axios"

const getAllPostsOfSubforum = async (subforum) => {
    const res = await axios.get(`/api/posts/${subforum}/all`)
    return res.data
}

const likePost = async (id, vote) => {
    const res = await axios.put(`/api/posts/${id}`, {vote: vote})
    return res.data
}

export default {getAllPostsOfSubforum, likePost}