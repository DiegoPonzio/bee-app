import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import PostComment from './OtherUsers/PostComment'
import Comments from './OtherUsers/Comments'
import { AiOutlineComment } from "react-icons/ai"

export default function Cards({ img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZhLHBfMTrKT4HCY7Lyue8ul7R_G5S24zHBT73LSjA2Fi536zNOPBM33V3SbVsSzaY3Uc&usqp=CAU", name, body, date, hour, place }) {

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(false);


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg md:cursor-pointer mx-30px mt-4">
            <img className="w-full" src={`${img}`} alt={name} onDoubleClick={() => setLike(!like)} />
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
            <div className='rounded grid grid-cols-2 place-items-center'>
                <AiOutlineComment size={20}/>
                <h5 className='justify-center' onClick={() => setComment(!comment)}>Comentarios</h5>
                {comment && (
                    <div className='col-span-2'>
                        <PostComment />
                        <Comments />
                    </div>
                )}
            </div>
        </div>
    )
}