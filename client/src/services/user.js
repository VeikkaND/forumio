import axios from "axios"

const login = async (config) => {
    const res = await axios.get("/api/users/login", config)
    return res.data
}

export default {login}