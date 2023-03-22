import { useEffect, useState } from "react"
import PropostPost from "../../components/OtherUsers/PropostPost";
import Spinners from "../../components/Spinners";

export default function ShowPost({ user, userName }) {

    const [hide, setHide] = useState(false)
    const [myPost, setMyPost] = useState()
    const [error, setError] = useState(false)
    const [spinner, setSpinner] = useState(true)
    const URL = `https://bee-pruebas.herokuapp.com/api/showAll/byUser/${user}`

    const fetchMyPost = async () => {
        const myPosts = await fetch(URL)
            .then(response => response.json())
            .then( responseJSON => setMyPost(responseJSON.result))
            .catch(() => {
                setSpinner(false)
                setError(true)
            })
    }

    useEffect(() => {
        fetchMyPost()
    })

    return (
        <div id="drawer-swipe" class="z-40 w-full overflow-y-auto bg-amber-300 rounded-lg" tabindex="-1" aria-labelledby="drawer-swipe-label">
            <div class="p-4 cursor-pointer hover:bg-amber-200" data-drawer-toggle="drawer-swipe" onClick={() => setHide(!hide)}>
                <span class="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2"></span>
                <h5 id="drawer-swipe-label" class="inline-flex items-center text-base text-gray-500"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path></svg>Mis Comunicados</h5>
            </div>
            <div className={hide ? "grid grid-cols-3 gap-4 p-4 lg:grid-cols-4" : "hidden"}>
                {error && (
                    <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
                        <span className="font-medium">¡Error!</span> Ocurrió un problema al momento de buscar tus solicitudes
                    </div>
                )}
                {!error && !myPost && spinner && <Spinners />}
                {!error && myPost && myPost.map( post => (
                    <PropostPost key={post.temp_id} icon={post.estado_id} sol={post.temp_id} user={userName} title={post.temp_titulo} />
                ))}
            </div>
        </div>
    )
}