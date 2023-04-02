const URL = `https://bee-app.herokuapp.com/api/showAll`

export async function getPosts() {
    return fetch(URL)
        .then(response => response.json())
        .then(responseJSON => {
            return responseJSON
        })
        .catch( (error) => {
            return []
        })
}