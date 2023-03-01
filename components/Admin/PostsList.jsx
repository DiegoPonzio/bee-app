import { useState, useEffect } from "react"
import Spinners from "../Spinners"
import CardAdmin from "./CardAdmin"
import { useEditPost } from "../../clientServices/hamburger"
import { getPosts } from "../../lib/getPosts"
import { MdFilterList } from "react-icons/md"

export default function PostsList({ user }) {
    const [postsList, setPostsList] = useState()
    const [selected, setSelected] = useState(true)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState("")
    const [selectedDelete, setSelectedDelete] = useState("")
    const URL = `http://localhost:3000/api/showAll/Posts/byAdmin/${user}`

    const fetchAll = async () => {
        const response = await fetch(URL)
            .then(response => response.json())
            .then(responseJSON => setPostsList(responseJSON))
            .catch(() => setError(true))
    }

    const fetchAllU = async () => {
        const data = await getPosts()
        setPostsList(data)
    }

    useEffect(() => {
        if (selected) {
            setLoader(true)
            fetchAll()
            setLoader(false)
        } else {
            setLoader(true)
            fetchAllU()
            setLoader(false)
        }

    }, [postsList, selected])


    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <div className="pt-2 bg-[#3C3838] w-1/5 rounded-xl flex justify-around items-center">
                    <span className={`inline-block ${!selected ? "bg-[#D1D1D1]" : "bg-[#FCE155]"} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer`} onClick={() => setSelected(true)}>Mios</span>
                    <span className={`inline-block ${selected ? "bg-[#D1D1D1]" : "bg-[#FCE155]"} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer`} onClick={() => setSelected(false)}>Todos</span>
                </div>
                <div className="pt-2 flex items-center justify-center">
                    <span className="inline-block bg-[#D1D1D1] rounded-full px-3 py-1 text-3xl font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                       <MdFilterList /> 
                    </span>
                </div>
            </div>
            <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
                <useEditPost.Provider value={{ selectedEdit, setSelectedEdit, setPostsList, selectedDelete, setSelectedDelete }}>
                    <>
                        {!postsList && !error && <Spinners />}
                        {!error && !loader && postsList?.result?.map(post => {
                            //console.log(bufferToBinaryString(post.pub_media.data))
                            return <CardAdmin img={String.fromCharCode(...post.pub_media.data)} title={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} place={post.pub_locacion} key={post.pub_id} id={post.pub_id} user={user} />
                        })}
                    </>
                </useEditPost.Provider>
            </div>
        </div>
    )
}