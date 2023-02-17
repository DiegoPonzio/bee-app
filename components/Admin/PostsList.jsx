import { useState, useEffect } from "react"
import Spinners from "../Spinners"
import CardAdmin from "./CardAdmin"
import { useEditPost } from "../../clientServices/hamburger"

export default function PostsList({user}) {
    const [postsList, setPostsList] = useState()
    const [error, setError] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState("")
    const URL = `https://bee-app.herokuapp.com/api/showAll`

    const fetchAll = async () => {
        const response = await fetch(URL)
            .then(response => response.json())
            .then(responseJSON => setPostsList(responseJSON.result))
            .catch(() => setError(true))
    }

    useEffect(() => {
        !postsList && fetchAll()
    }, [postsList])


    return (
        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
            <useEditPost.Provider value={{selectedEdit, setSelectedEdit, setPostsList}}>
                <>
                    {!postsList && !error && <Spinners />}
                    {!error && postsList && postsList.map(post => {
                        //console.log(bufferToBinaryString(post.pub_media.data))
                        return <CardAdmin img={String.fromCharCode(...post.pub_media.data)} title={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} place={post.pub_locacion} key={post.pub_id} id={post.pub_id} user={user} />
                    })}
                </>
            </useEditPost.Provider>
        </div>
    )
}