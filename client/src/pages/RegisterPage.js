import usersService from "../services/user"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const password2 = event.target.password2.value

        // TODO validators for username, check that username does not exist

        if(password === password2) {
            const user = {
                username: username,
                password: password
            }
            await usersService.register(user)
            navigate("/login")
        } else {
            console.log("passwords do not match")
            // TODO some message to user here
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>username</p>
                <input name="username"></input>
                <p>password</p>
                <input name="password"></input>
                <p>password again</p>
                <input name="password2"></input> <br/>
                <button type="submit">register</button>
            </form>
        </div>
    )
}

export default RegisterPage