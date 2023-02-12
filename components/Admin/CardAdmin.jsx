import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { AiOutlineUser } from 'react-icons/ai'
import Link from 'next/link'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'

export default function CardAdmin({ status, id, title, body, date, hour, place, img }) {

    const formatDate = date => {
        const res = new Date(date).toLocaleDateString()
        return res
    } 

    const onDelete = async () => {
        const res = axios.delete(`/api/deletePost/${id}`)
            .then( () =>  NotificationManager.success('Se ha eliminado correctamente', 'Exito!!', 5000) )
            .catch( () => NotificationManager.error( 'Ocurrió un problema al eliminar', 'Error!!', 5000) )
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
        <div className="max-w-sm rounded overflow-hidden shadow-lg md:cursor-pointer mx-30px mt-10">
            <img className="w-full" src={img} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">{title} <div className='float-right mt-1'> <a href="#" className="text-gray-500 hover:text-yellow-200 ">
                    {!status && <BsTrash size={23} onClick={ () => onDelete() } />}
                    {status && <ImCross size={20} onClick={ () => onDeny() } />}
                    <span className="sr-only">Borrar comunicado</span>
                </a></div>
                    <div className='float-right mt-1 mr-4'><Link href={status ? `/user/admin/Solicitudes/${id}` : `/user/admin/edit/${id}`}><a href="#" className="text-gray-500 hover:text-yellow-200 ">
                        <HiOutlinePencilAlt size={25} />
                        <span className="sr-only">Editar comunicado</span>
                    </a></Link>
                    </div>
                    {status && <div className='float-right mt-1 mr-4'><a href="#" className="text-gray-500 hover:text-yellow-200 ">
                        <AiOutlineUser size={25} />
                        <span className="sr-only">Ver usuario</span>
                    </a>
                    </div>}
                </div>
                <p className="text-gray-700 text-base">
                   {body}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                { date && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Fecha: {formatDate(date)}</span>}
                { hour && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Hora: {new Date(hour).toLocaleString()}</span>}
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{status ? "Especialidad" : "Lugar"}: {place}</span>
            </div>
        </div>
    )
}