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
            // TODO do something here
            console.log("wrong password")
        } else {
            window.localStorage.setItem("token", res.token)
            window.localStorage.setItem("userid", res.userId)
            window.localStorage.setItem("username", res.username)
            navigate("/")
            window.location.reload(false)
        }
        
    }
    return (
        <div className="loginpage">
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td><input name="username"></input></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input name="password"></input></td>
                        </tr>
                    </tbody>
                </table>    
                <p>
                    <span>Don't have an account? </span> 
                    <a href="/register">register here</a> <br/>
                </p>
                <button type="submit">login</button>
            </form>
        </div>
        
    )
}

export default LoginPage