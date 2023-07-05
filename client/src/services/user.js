import axios from "axios"

const login = async (config) => {
    const res = await axios.get("/api/users/login", config)
    return res.data
}

const register = async (user) => {
    const res = await axios.post("/api/users", user)
    return res.data
}

export default {login, register}