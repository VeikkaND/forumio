import axios from "axios"

const getAllPostsOfSubforum = async (subforum) => {
    const res = await axios.get(`/api/posts/${subforum}/all`)
    return res.data
}

const votePost = async (id, vote, token) => {
    const res = await axios.put(`/api/posts/${id}`, {vote: vote}, {
        headers: {
            "Authorization": `Bearer ${token}`
        } 
    })
    return res.data
}
const removeVote = async (id, vote, token) => {
    const res = await axios.put(`/api/posts/${id}/remove`, {vote: vote}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data
}

const newPost = async (post, token) => {
    const res = await axios.post(`/api/posts`, post, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data
}

const deletePost = async (postId, token) => {
    const res = await axios.delete(`/api/posts/${postId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data
}

export default {
    getAllPostsOfSubforum, 
    votePost, 
    removeVote, 
    newPost,
    deletePost
}