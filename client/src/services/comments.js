import axios from "axios"

const likeComment = async (comment, vote) => {
    const res = await axios
        .put(`/api/comments/${comment._id}`, {vote: vote})
    return res.data
}

const getAllCommentsOfPost = async (postId) => {
    const res = await axios.get(`/api/comments/${postId}/all`)
    return res.data
}

const getPost = async (id) => {
    const res = await axios.get(`/api/posts/${id}`)
    return res.data
}

const postComment = async (comment, token, postId) => {
    const res = await axios.post(`/api/comments`, {
        comment: comment,
        postId: postId
    }, {
        headers: {"Authorization": `Bearer ${token}`}
    })
}

export default {likeComment, getAllCommentsOfPost, getPost, postComment}