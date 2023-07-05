const RegisterPage = () => {
    const handleSubmit = (event) => {
        const username = event.target.username.value
        const password = event.target.password.value
        const password2 = event.target.password2.value
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