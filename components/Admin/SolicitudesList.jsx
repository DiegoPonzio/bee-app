import { useEffect, useState } from "react"
import CardAdmin from "./CardAdmin"

export default function SolicitudList() {
    const [error, setError] = useState(false)
    const [post, setPost] = useState()

    const URL = 'https://bee-pruebas.herokuapp.com/api/showAll/byUser'

    const fetchUsers = async () => {
        const response = await fetch(URL)
            .then(response => response.json())
            .then(responseJSON => {
                setPost(responseJSON.result)
                setError(false)
            })
            .catch(() => setError(true))
    }

    useEffect(() => {
        !post && fetchUsers()
    })

    return (
        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
            {!error && post && post.map(post => (
                <CardAdmin img={String.fromCharCode(...post.temp_media.data)} status={true} id={post.temp_id} key={post.temp_id} title={post.temp_titulo} body={post.temp_descripcion} place={post.temp_esp} />
            ))}
        </div>
    )
}