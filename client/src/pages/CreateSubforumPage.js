import subforumsService from "../services/subforums"

const CreateSubforumPage = () => {
    const handleSubmit = async (event) => {
        const name = event.target.title.value
        const description = event.target.description.value

        const subforum = {
            name: name,
            description: description
        }

        const res = await subforumsService
            .newSubforum(subforum, window.localStorage.getItem("token"))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>title</p>
                <input name="title"></input> <br/>
                <p>description</p>
                <textarea name="description"></textarea> <br/>
                <button type="submit">create</button>
            </form>
            
        </div>
    )
}

export default CreateSubforumPage