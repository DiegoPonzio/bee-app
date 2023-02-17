import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { useContext } from 'react'
import { useEditPost } from '../../clientServices/hamburger'
import Editar from './Editar'
import DeletePost from './DeletePost'

export default function CardAdmin({ status, id, title, body, date, hour, place, img, user }) {
    const ctx = useContext(useEditPost)
    const { selectedEdit, setSelectedEdit, setSelectedDelete, selectedDelete } = ctx
    const formatDate = date => {
        const res = new Date(date).toLocaleDateString()
        return res
    } 

    const onDeny = async () => {
        const res = axios.put("/api/upatePropost", {
            id,
            status: 3
        })
            .then( () =>  NotificationManager.success('Se ha Negado la solicitud', 'Exito!!', 5000) )
            .catch( () => NotificationManager.error('Ocurrió un problema al negar la solicitud', 'Error!!', 5000) )
    }
    // 
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg md:cursor-pointer mx-30px mt-10 bg-[#3C3838]">
            <img className="w-full" src={img} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">{title} <div className='float-right mt-1'> <div className="text-gray-500 hover:text-yellow-200 cursor-pointer">
                    {!status && <BsTrash size={23} onClick={ () => setSelectedDelete(`delete_${id}`)} />}
                    {status && <ImCross size={20} onClick={ () => onDeny() } />}
                    <span className="sr-only">Borrar comunicado</span>
                </div></div>
                    <div className='float-right mt-1 mr-4'><div onClick={ () => status ?  setSelectedEdit(`sol_${id}`) : setSelectedEdit(`edit_${id}`)} className="text-gray-500 hover:text-yellow-200 cursor-pointer">
                        <HiOutlinePencilAlt size={25} />
                        <span className="sr-only">Editar comunicado</span>
                    </div>
                    </div>
                    {status && <div className='float-right mt-1 mr-4'><a href="#" className="text-gray-500 hover:text-yellow-200 ">
                        <AiOutlineUser size={25} />
                        <span className="sr-only">Ver usuario</span>
                    </a>
                    </div>}
                </div>
                <p className="text-gray-300 text-base">
                   {body}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                { date && <span className="inline-block bg-[#FCE155] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Fecha: {formatDate(date)}</span>}
                { hour && <span className="inline-block bg-[#FCE155] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Hora: {new Date(hour).toLocaleString()}</span>}
                <span className="inline-block bg-[#FCE155] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{status ? "Especialidad" : "Lugar"}: {place}</span>
            </div>
            {selectedEdit === `edit_${id}` && <Editar id={id} user={user} />}
            {selectedDelete === `delete_${id}` && <DeletePost id={id} />}
        </div>
    )
}