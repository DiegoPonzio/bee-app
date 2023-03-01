const URL = `http://localhost:3000/api/showAll`

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