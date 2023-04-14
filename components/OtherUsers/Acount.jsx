import  { useAcout } from "../../clientServices/hamburger";
import {useState} from "react";
import EditUser from "./EditUser";

export default function Acount ({ user }) {
    const {  usu_nombre, usu_clave, usu_contraseña, usu_rfc, usu_cedula } = user
    const [item, setItem] = useState(0)

    return(
        <div>
            <h1 className="pb-4">Configuración general de la cuenta</h1>
            <useAcout.Provider value={{ item, setItem }}>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs uppercase bg-gray-10 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3" colSpan={3}>
                                Datos del usuario
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="border-b border-gray-700">
                            <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                Nombre de usuario
                            </th>
                            <td className="px-6 py-4">
                                {usu_nombre}
                            </td>
                            <td className="px-6 py-4">
                                <a href="#"
                                   onClick={() => setItem(1)}
                                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                Correo electrónico
                            </th>
                            <td className="px-6 py-4">
                                {usu_clave}
                            </td>
                            <td className="px-6 py-4">
                                <a href="#"
                                   onClick={() => setItem(2)}
                                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                            <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                Contraseña
                            </th>
                            <td className="px-6 py-4">
                                {usu_nombre}
                            </td>
                            <td className="px-6 py-4">
                                <a href="#"
                                      onClick={() => setItem(3)}
                                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        {usu_rfc && (
                            <tr className="border-b border-gray-700">
                                <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    RFC
                                </th>
                                <td className="px-6 py-4">
                                    {usu_rfc}
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#"
                                       onClick={() => setItem(4)}
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        )}
                        {usu_cedula && (
                            <tr className="border-b border-gray-700">
                                <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    Cedula
                                </th>
                                <td className="px-6 py-4">
                                    {usu_cedula}
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#"
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {item !== 0 && <EditUser user={user} />}
            </useAcout.Provider>
        </div>
    )
}