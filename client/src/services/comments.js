import axios from "axios"

const voteComment = async (comment, vote, token) => {
    const res = await axios
        .put(`/api/comments/${comment._id}`, {vote: vote}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    return res.data
}

const removeVote = async (comment, vote, token) => {
    const res = await axios
        .put(`/api/comments/${comment._id}/remove`, {vote: vote}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
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
        comment: comment.content,
        postId: postId,
        parent: comment.parent
    }, {
        headers: {"Authorization": `Bearer ${token}`}
    })
    return res.data
}

const deleteComment = async (commentId, token) => {
    const res = await axios.delete(`/api/comments/${commentId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return res.data
}

export default {
    voteComment, 
    removeVote, 
    getAllCommentsOfPost, 
    getPost, 
    postComment,
    deleteComment
}