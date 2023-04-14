import Spinners from "../Spinners";
import {useAcout} from "../../clientServices/hamburger";
import {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {NotificationManager} from "react-notifications";

export  default  function  EditUser ({ user }) {
    const ctx = useContext(useAcout)
    const { item, setItem } = ctx
    const  { usu_nombre, usu_clave, usu_contraseña, usu_rfc, usu_cedula, usu_id } = user
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    const [next, setNext] = useState(false)
    const [error, setError] = useState(false)
    const isEdited = watch("edited")

    const willEdit = item === 1 ? (
        <div>
            <label htmlFor="edited"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{`Nuevo nombre de usuario`}</label>
            <input
                type="text"
                id="edited"
                className={`bg-gray-50 border ${errors.edited ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder={usu_nombre}
                {...register("edited", {required: true, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })}
            />
            {errors.edited || error && <p className="text-red-500 text-xs italic pt-3">Nombre no valido</p>}
        </div>
    ) : item === 2 ? (
        <div>
            <label htmlFor="edited"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nuevo correo</label>
            <input
                type="email"
                id="edited"
                className={`bg-gray-50 border ${errors.edited ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder={usu_clave}
                {...register("edited", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            />
            {errors.edited && <p className="text-red-500 text-xs italic pt-3">Correo no valido</p>}
        </div>
    ) : item === 4 ? (
        <div>
            <label htmlFor="edited"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nuevo RFC</label>
            <input
                type="text"
                id="edited"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder={usu_rfc}
            />
        </div>
    ) : null

    const actionHandler = async data => {
        console.log(data)
        const { edited, password } = data

        const response = await axios.put(`/api/updateUser/${usu_id}`, {
            edited,
            item,
            password,
        }).then(verify)
            .catch(myError)
    }

    const verify = (response) => {
        const palabra = item === 1 ? "Nombre de usuario" : item === 2 ? "Correo" : item === 3 ? "Contraseña" : item === 4 ? "RFC" : null
        NotificationManager.success(`${palabra} actualizado`, "Éxito", 3000)
        NotificationManager.info("Cierra sesión para poder ver los cambios", "Nota", 5000)
    }

    const myError = (error) => {
        const palabra = item === 1 ? "nombre de usuario" : item === 2 ? "correo" : item === 3 ? "contraseña" : item === 4 ? "RFC" : null

        if (error.response.status === 401) {
            NotificationManager.error("Contraseña incorrecta", "Error", 5000)
        } else {
            NotificationManager.error(`Error al actualizar el ${palabra}`, "Error", 5000)
        }
    }

    const setIsEdited = () => {
        if (isEdited !== "") {
            setNext(true)
        } else {
            setError(true)
        }
    }

    return (
        <div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full items-center justify-center flex">
            <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-[#3C3838] rounded-lg shadow">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="popup-modal" onClick={ () => setItem(0)} >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Editar: </h3>
                        <form className="space-y-6" onSubmit={handleSubmit(actionHandler)}>
                            {!next && willEdit}
                            {!next && <button data-modal-toggle="popup-modal" type="button" className="text-white bg-yellow-10 hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"  onClick={setIsEdited}>
                                        Continuar
                                    </button>}
                            {next && (
                                <>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingresa tu contraseña</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className={`bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                            placeholder={"************"}
                                            {...register("password", {required: true})}
                                        />
                                        {errors.password && <p className="text-red-500 text-xs italic pt-3">Contraseña no valida no valido</p>}
                                    </div>
                                    <button data-modal-toggle="popup-modal" type="submit" className="text-white bg-yellow-10 hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" >
                                        Actualizar
                                    </button>
                                </>
                            )}
                            <button data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={ () => setItem(0)}>No, cancelar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}