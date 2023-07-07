export const dateFormatter = (date) => {
    const dateFormat = new Date(date)
    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }
    const d = new Intl.DateTimeFormat("en-GB", options).format(dateFormat)
    return d
}

export const formatToDays = (date) => {
    const dateFormat = new Date(date)
    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }
    const d = new Intl.DateTimeFormat("en-GB", options).format(dateFormat)
    return d
}