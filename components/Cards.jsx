import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import PostComment from './OtherUsers/PostComment'
import Comments from './OtherUsers/Comments'
import { useComment } from "../clientServices/hamburger"
import axios from 'axios'
import { AiOutlineUser, AiOutlineComment } from 'react-icons/ai'
import useUser from '../lib/user'
import useLikeIfU from '../lib/getLikesIfU'

export default function Cards({ img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZhLHBfMTrKT4HCY7Lyue8ul7R_G5S24zHBT73LSjA2Fi536zNOPBM33V3SbVsSzaY3Uc&usqp=CAU", name, body, date, hour, hour2, place, id, link, who, index, cecyt }) {

    const [user, message] = useUser()
    const [likes] = useLikeIfU(user, cecyt)
    //const [likeM, messageL] = useLikeIfU(user, id)
    const [like, setLike] = useState();
    const [posts, setPosts] = useState()
    const [error, setError] = useState(false)
    const URL = `/api/showComments/byId/${id}`
    let URLLike = `/api/verifLike/${user}/${id}`

    const saveLike = () => {
        //se valida si anetriormente dio like
        if (!like) {
            //no ha dado like
            console.log("entro a dar like");
            const res = axios.post(URLLike, {
                user,
                post: id
            }).then(() => setLike(true)).catch(() => setLike(false))

        } else {
            console.log("entro a quitar like");
            //dio like
            URLLike = `/api/verifLike/${user}/${id}`

            const res = axios.delete(URLLike)
                .then(() => setLike(false)).catch(() => setLike(true))
        }
        //si se dio se actualiza, si no se guarda
    }

    const fetchComments = async () => {
        const response = await axios.get(URL)
            .then(setPosts)
            .catch(() => setError(true))
    }

    const formatDate = date => {
        const res = new Date(date).toLocaleDateString()
        return res
    }

    useEffect(() => {
        !posts && fetchComments()
        likes && setLike(likes[index])
    }, [posts, likes])

    return (
        <div className='md:flex md:gap-5 rounded shadow-lg px-5 bg-gray-10 snap-center pb-2'>
            <div className="max-w-sm md:max-w-md overflow-hidden md:cursor-pointer mx-3 mt-4 border-r-2 border-r-white max-h-[900px]">
                <img className="w-full max-h-72 pr-3 rounded object-cover object-center" src={`${img}`} alt={name} onDoubleClick={() => saveLike()} />
                <div className='px-4 py-4'>
                    <p className="inline-flex items-center text-sm text-gray-500 ">
                        <AiOutlineUser />{" "}
                        {/* hay que poner el nombre del usuario  */}
                        {who}
                    </p>
                </div>
                <div className="px-6 py-2">
                    <div className="font-bold text-xl mb-2 text-white">{name}
                        <div className='float-right mt-1' onClick={() => saveLike()} >
                            {like ? <FaHeart size={25} color="red" /> : <FiHeart size={25} color="grey" />}
                        </div>
                    </div>
                    <p className="text-gray-300 text-base">
                        {body}
                    </p>
                </div>
                <div className="px-4 pt-2 pb-1 flex-col">
                    <span className="inline-block bg-yellow-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Publicado el: {formatDate(date)}</span>
                    <span className="inline-block bg-yellow-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Desde: {new Date(hour).toLocaleString()}</span>
                    <span className="inline-block bg-yellow-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Hasta: {new Date(hour2).toLocaleString()}</span>
                    <span className="inline-block bg-yellow-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lugar: {place}</span>
                </div>
                <div className='px-4 pt-2 pb-3'>
                    <a href={link} target="_blank" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-500 hover:bg-yellow-10 hover:text-gray-700 rounded-lg">
                        Leer más
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                    <div className="float-right px-4 pt-2 pb-3 text-gray-300">
                        {`Número de comentarios: ${posts ? posts.data.result.length : "0"}`}
                    </div>
                </div>
            </div>
            <div className='flex-col mx-3 mt-4'>
                <p className="text-gray-300 text-base flex"><AiOutlineComment className='pl-1 text-xl pr-1' /> Comentarios</p>
                <useComment.Provider value={{ setPosts }}>
                    <div className='overflow-y-scroll h-4/5 max-w-sm break-words scrollbar-thin scrollbar-thumb-yellow-10 scrollbar-track-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full snap-y'>
                        {posts && posts.data.result.map(post => (
                            <Comments user={post.usu_nombre} text={post.com_desc} key={`comment_${post.com_id}`}
                            />
                        ))}
                    </div>
                    <br />
                    <PostComment id={id} user={user} />
                </useComment.Provider>
            </div>
        </div>
    )
}