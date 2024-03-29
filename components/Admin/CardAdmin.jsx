import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'
import { AiOutlineUser } from 'react-icons/ai'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { useContext } from 'react'
import { useEditPost } from '../../clientServices/hamburger'
import Editar from './Editar'
import DeletePost from './DeletePost'
import {CgSandClock} from "react-icons/cg";
import {TiTick} from "react-icons/ti";
import {MdCancel} from "react-icons/md";
import { useState } from 'react'
import ModalDeny from "./modal/ModalAcepted";
import {sendEmailAccept} from "../../config/emailPull";

export default function CardAdmin({ status, id, title, body, date, hour, place, img, user, isNoAdmin, icon, email, admin }) {
    const ctx = useContext(useEditPost)
    const { selectedEdit, setSelectedEdit, setSelectedDelete, selectedDelete } = ctx
    const [open, setOpen] = useState(false)
    const formatDate = date => {
        const res = new Date(date).toLocaleDateString()
        return res
    } 

    const sendEmail = async () => {
        const response = await axios.post('/api/emailUser', {
            email,
            message: "Su solicitud ha sido Acepatada",
            admin
        })
        const {usu_clave, usu_nombre} = response.data

        const responseEmail = await sendEmailAccept(usu_clave, title, usu_nombre, admin, formatDate(date), place)
    }
    const onAccept = async () => {
        try {
            await sendEmail()

            const res = axios.put("/api/upatePropost", {
                id,
                status: 2
            })
                .then(() => NotificationManager.success('Solicitud aceptada', 'Exito!!', 5000))
                .catch(() => NotificationManager.error('Error!!', 'Ocurrio un problema al aceptar', 5000))
        } catch (error) {
            console.log(error)
            NotificationManager.error('Error!!', 'Ocurrio un problema al aceptar', 5000)
        }
    }

    const handleAcept = () => {
        setOpen(!open)
    }

    const onDeny = async () => {
        const res = axios.put("/api/upatePropost", {
            id,
            status: 3
        })
            .then( () =>  NotificationManager.success('Se ha negado la solicitud', '¡Exito!', 5000) )
            .catch( () => NotificationManager.error('Ocurrió un problema al negar la solicitud', '¡Error!', 5000) )
    }
    // 
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg md:cursor-pointer mx-30px mt-10 bg-gray-10">
            <img className="w-full" src={img} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">
                    {title}
                    <div className='flex float-right mt-1 items-center'>
                        {!status && <div className='mt-1 mr-4'>
                            <a href="#" className="text-gray-500 hover:text-yellow-200 ">
                                <AiOutlineUser size={25} />
                                <span className="sr-only">Ver usuario</span>
                            </a>
                        </div>
                        }
                        <div className="text-gray-500 hover:text-yellow-200 cursor-pointer" onClick={onAccept}>
                            {!isNoAdmin && !status && icon === 1 && <TiTick size={35} />}
                        </div>
                        <div className="text-gray-500 hover:text-yellow-200 cursor-pointer">
                            {!isNoAdmin && status && <BsTrash size={23} onClick={ () => setSelectedDelete(`delete_${id}`)} />}
                            {!isNoAdmin && !status && icon === 1 && <ImCross size={20} onClick={handleAcept}/>}
                            {!isNoAdmin && !status && icon === 3 && <MdCancel size={25} color="#CB3234" />}
                            {!isNoAdmin && !status && icon === 2 && <TiTick size={25} color="green" />}
                            {isNoAdmin && (
                                <>
                                    {icon === 1 && <CgSandClock size={25} />}
                                    {icon === 2 && <TiTick size={25} color="green" />}
                                    {icon === 3 && <MdCancel size={25} color="#CB3234" />}
                                </>
                            )}
                            <span className="sr-only">Borrar comunicado</span>
                        </div>
                    </div>
                    <div className='float-right mt-1 mr-4'>
                        {status && <div onClick={ () => !status ?  setSelectedEdit(`sol_${id}`) : setSelectedEdit(`edit_${id}`)} className="text-gray-500 hover:text-yellow-200 cursor-pointer">
                            <HiOutlinePencilAlt size={25} />
                            <span className="sr-only">Editar comunicado</span>
                        </div>}
                    </div>
                </div>
                <p className="text-gray-300 text-base">
                   {body}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                { date && <span className="inline-block bg-yellow-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Fecha: {formatDate(date)}</span>}
                { hour && <span className="inline-block bg-yellow-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Hora: {new Date(hour).toLocaleString()}</span>}
                <span className="inline-block bg-yellow-10 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{status ? "Especialidad" : "Lugar"}: {place}</span>
            </div>
            {selectedEdit === `edit_${id}` && <Editar id={id} user={user} />}
            {selectedDelete === `delete_${id}` && <DeletePost id={id} />}
            {open && <ModalDeny open={open} handleAcepted={onDeny} id={id} handleClose={handleAcept} email={email} admin={admin} solName={title} date={formatDate(date)} img={img} />}
        </div>
    )
}