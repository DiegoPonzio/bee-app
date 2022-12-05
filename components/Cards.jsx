import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import PostComment from './OtherUsers/PostComment'
import Comments from './OtherUsers/Comments'
import { AiOutlineComment } from "react-icons/ai"
import axios from 'axios'
import { AiOutlineUser } from 'react-icons/ai'

export default function Cards({ img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZhLHBfMTrKT4HCY7Lyue8ul7R_G5S24zHBT73LSjA2Fi536zNOPBM33V3SbVsSzaY3Uc&usqp=CAU", name, body, date, hour, place, id, link, who }) {

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(false);
    const [posts, setPosts] = useState()
    const [error, setError] = useState(false)
    const URL = `/api/showComments/byId/${id}`

    const fetchComments = async () => {
        const response = await axios.get(URL)
            .then(setPosts)
            .catch(() => setError(true))
    }

    useEffect(() => {
        !posts && fetchComments()
    }, [posts])

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg md:cursor-pointer mx-30px mt-4">
            <img className="w-full" src={`${img}`} alt={name} onDoubleClick={() => setLike(!like)} />
            <div className='px-4 py-4'>
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                    <AiOutlineUser />{" "}
                    {/* hay que poner el nombre del usuario  */}
                    {who}
                </p>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">{name}<div className='float-right mt-1' onClick={() => setLike(!like)} >{like ? <FaHeart size={25} color="red" /> : <FiHeart size={25} color="grey" />}</div></div>
                <p className="text-gray-700 text-base">
                    {body}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Fecha: {date}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Hora: {hour}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Lugar: {place}</span>
            </div>
            <div className='px-6 pt-4 pb-2 justify-center items-center'>
                <a href={link} target="_blank" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-amber-300 hover:bg-yellow-200 rounded-lg focus:border-amber-500">
                    Leer más...
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </div>
            <br/>
            <div className='rounded grid grid-cols-1 place-items-center gap-1'>
                <div onClick={() => setComment(!comment)}>
                    <div className='flex justify-between'>
                        <AiOutlineComment size={20} />
                        <h5 className='justify-center'> &nbsp;&nbsp; Comentarios</h5>
                    </div>
                </div>
                {comment && (
                    <>
                        <div>
                            <PostComment id={id} />
                        </div>
                        {posts && posts.data.result.map(post => (
                            <Comments user={post.com_nombre} text={post.com_desc} key={`comment_${post.com_id}`}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}