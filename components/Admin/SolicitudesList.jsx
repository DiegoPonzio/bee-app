import { useEffect, useState } from "react"
import CardAdmin from "./CardAdmin"

export default function SolicitudList({ status, admin }) {
    const [error, setError] = useState(false)
    const [post, setPost] = useState()

    const URL = !status ? 'https://bee-app.herokuapp.com/api/showAll/byUser' : `https://bee-app.herokuapp.com/api/showAll/byUser/${status}}`

    const fetchUsers = async () => {
        const response = await fetch(URL)
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON.result)
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
                <CardAdmin img={post.temp_media} isNoAdmin={status ? true : false} id={post.temp_id} key={post.temp_id} title={post.temp_titulo} body={post.temp_descripcion} place={post.temp_esp} icon={post.estado_id} email={post.usu_id} admin={admin} />
            ))}
        </div>
    )
}