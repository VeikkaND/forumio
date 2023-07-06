import axios from "axios"

const getAllPostsOfSubforum = async (subforum) => {
    const res = await axios.get(`/api/posts/${subforum}/all`)
    return res.data
}

const likePost = async (id, vote) => {
    const res = await axios.put(`/api/posts/${id}`, {vote: vote})
    return res.data
}

const newPost = async (post, token) => {
    const config = {
        headers: {"Authorization": `Bearer ${token}`}
    }
    const res = await axios.post(`api/posts`, post, config)
    return res.data
}

export default {getAllPostsOfSubforum, likePost, newPost}