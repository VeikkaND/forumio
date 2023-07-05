import usersService from "../services/user"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const config = {
            headers: {
                username: username,
                password: password
            }
        }
        const res = await usersService.login(config)
        if(res === false) {
            console.log("wrong password")
        } else {
            // set token to localStorage
            window.localStorage.setItem("token", res)
            navigate("/")
        }
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>username</p>
            <input name="username"></input> <br/>
            <p>password</p>
            <input name="password"></input> <br/>
            <span>Don't have an account? </span> 
            <a href="/register">register here</a> <br/>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginPage