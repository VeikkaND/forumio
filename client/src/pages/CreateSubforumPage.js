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
        <div className="createsub">
            <div className="header">
                <h2>Create a new subforum</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Title</h3>
                <input name="title" 
                    placeholder="A fitting title for your subforum">
                </input> <br/>
                <h3>Description</h3>
                <textarea name="description" rows={4} 
                    placeholder="Describe the subforum in a few words">
                </textarea> <br/>
                <button type="submit">Create</button>
            </form>
            
        </div>
    )
}

export default CreateSubforumPage