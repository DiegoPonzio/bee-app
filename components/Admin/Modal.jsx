import { FiLogOut } from "react-icons/fi"
import { AiOutlineUserAdd, AiOutlineFileAdd, AiOutlineAppstore } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi";
import { useAdminItem } from "../../clientServices/hamburger";
import { useContext } from "react";
import axios from "axios";
import Router from "next/router";
import {NotificationManager} from "react-notifications";

export default function Modal({userName}) {
    const ctx = useContext(useAdminItem)
    const { setSelectedItem } = ctx

    const logOut = async () => {
        const res = await axios.get('/api/logout')
            .then(() => Router.replace('/'))
            .catch(() => NotificationManager.error('¡Error!', 'Ocurrió un problema', 5000))
    }

    return(
        <div id="drawer-navigation" className={`fixed z-40 h-screen p-5 overflow-y-auto w-80`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label" className="text-base font-semibold text-white uppercase">¡Bienvenido!</h5>
            <div className="flex items-center p-1 text-base font-normal text-white">
                <BiUserCircle className="w-7 h-7 text-[#FCE155]" />
                {/* nombre del usuario */}
                <span className="ml-3">{`${userName}`}</span>
            </div>
            <div className="py-4 overflow-y-auto">
                <ul className="space-y-2">
                    <li>
                        <div className="flex items-center p-2 cursor-pointer text-base font-normal text-white rounded-lg hover:bg-gray-300 hover:text-gray-800" onClick={ () => setSelectedItem(1)}>
                            <svg aria-hidden="true" className="w-6 h-6 text-[#FCE155] transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3">Mi espacio</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg hover:bg-gray-300 hover:text-gray-800" onClick={ () => setSelectedItem(2)}>
                            <AiOutlineAppstore className="flex-shrink-0 w-6 h-6 text-[#FCE155] transition duration-75 group-hover:text-gray-900" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Ver Propuestas</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center cursor-pointer p-2 text-base font-normal text-white rounded-lg hover:bg-gray-300 hover:text-gray-800" onClick={ () => setSelectedItem(4)}>
                            <AiOutlineAppstore className="flex-shrink-0 w-6 h-6 text-[#FCE155] transition duration-75 group-hover:text-gray-900" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Mis comunicados</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 text-base font-normal cursor-pointer text-white rounded-lg hover:bg-gray-300 hover:text-gray-800" onClick={ () => setSelectedItem(3)}>
                            <AiOutlineFileAdd className="flex-shrink-0 w-6 h-6 text-[#FCE155] transition duration-75 group-hover:text-gray-900" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Agregar Comunicado</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 text-base font-normal cursor-pointer text-white rounded-lg hover:bg-gray-300 hover:text-gray-800" onClick={ () => setSelectedItem(5)}>
                            <AiOutlineUserAdd className="flex-shrink-0 w-6 h-6 text-[#FCE155] transition duration-75 group-hover:text-gray-900" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Mi perfil</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center p-2 text-base font-normal text-white rounded-lg hover:bg-gray-300 hover:text-gray-800 cursor-pointer" onClick={() => logOut()}>
                            <FiLogOut className="flex-shrink-0 w-6 h-6 text-[#FCE155] transition duration-75 group-hover:text-gray-900" />
                            <span className="flex-1 ml-3 whitespace-nowrap">Cerrar Sesión</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}