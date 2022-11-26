import Layout from "../components/Layout"
import { useState } from "react";
import axios from "axios";
import { hashUser } from "../config/hashUser";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Router from "next/router";
import withSession from "../lib/session";
import Spinners from "../components/Spinners"

export default function SignUp() {

    const [file, setFile] = useState(null)
    const [stateFile, setStateFile] = useState(false)
    const [hideButton, setHideButton] = useState(false)
    const [fileName, setFileName] = useState("")
    const [dublEmail, setDublEmail] = useState(false)
    const [longUserName, setLongUserName] = useState(false)
    const [serverError, setServerError] = useState(false)

    const { register, formState: { errors, dirtyFields }, watch, handleSubmit } = useForm();

    const rfc = watch("tipoCuenta");
    const [errorPassword, setErrorPassword] = useState(false)

    const handlerFile = e => {
        const files = e.target.files
        const file = files[0]
        setFileName(file.name)
        const reader = new FileReader()
        reader.onload = function (e) {
            const blob = e.target.result
            setFile(blob)
            setStateFile(true)
        }

        reader.readAsBinaryString(file)
    }

    const Errors = e => {
        console.log(e);
        setHideButton(false)
        setDublEmail(false)
        setErrorPassword(false)
        setLongUserName(false)
        e.response.data.error.code === "ER_DUP_ENTRY" && setDublEmail(true)
        e.response.data.error.message === "Data too long for column 'usu_nombre' at row 1" && setLongUserName(true)
        e.response.data.error.code !== "ER_DUP_ENTRY" &&  e.response.data.error.message === "Data too long for column 'usu_nombre' at row 1" && setServerError(true)
    }

    const actioHandler = async e => {
        setHideButton(true)
        if (dirtyFields.tipoCuenta) {
            const { tipoCuenta, userName, userEmail, userRFC, password1, password2 } = e
            if (password1 === password2) {
                setErrorPassword(false)
                const hashPAss = hashUser(password1)
                const res = await axios.post('/api/saveAuth', {
                    userName,
                    hashPAss,
                    userEmail,
                    userRFC,
                    userCedula: file,
                    tipoCuenta,
                    password1
                }).then(Veryfy)
                    .catch(Errors)
            } else {
                setErrorPassword(true)
                setHideButton(false)
            }
        } else {
            setHideButton(false)
        }
    }

    const Veryfy = async (status) => {
        //setStatus(status)
        //console.log(status);
        Router.replace("/user/home")
    }

    return (
        <>
            <Layout title='Sign out' />
            <div className="place-content-center bg-amber-200 min-h-screen w-full flex items-center justify-center">
                <div className="sm:w-xs md:w-1/2 lg:w-8/12">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit(actioHandler)}>
                        <h3 className="mb-5 text-lg font-medium text-gray-900">Selecciona el tipo de cuenta: </h3>
                        <ul className="grid gap-6 w-full md:grid-cols-2">
                            <li>
                                <input type="radio" id="hosting-small" name="hosting" value="Empresa" className="hidden peer" {...register("tipoCuenta")} />
                                <label htmlFor="hosting-small" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-amber-400 peer-checked:text-amber-400 hover:text-gray-600 hover:bg-gray-100">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Empresa</div>
                                        <div className="w-full">Si vienes por parte de una empresa registrate aqui!!</div>
                                    </div>
                                    <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="hosting-big" name="hosting" value="Egresado" className="hidden peer" {...register("tipoCuenta")} />
                                <label htmlFor="hosting-big" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer peer-checked:border-amber-400 peer-checked:text-amber-400   hover:text-gray-600 hover:bg-gray-100">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Egresado</div>
                                        <div className="w-full">Registrate siendo Egresado o Freelancer!!</div>
                                    </div>
                                    <svg aria-hidden="true" className="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </label>
                            </li>
                        </ul>
                        {!dirtyFields.tipoCuenta && (
                            <p className="text-red-500 text-xs italic">Selecciona un tipo de cuenta</p>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mt-5 mb-2" htmlFor="username">
                                Nombre Completo
                            </label>
                            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.userName && 'border-red-500'}`} id="username" type="text" placeholder="Nombre" {...register("userName", { required: true, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })} />
                            {errors.userName && <p className="text-red-500 text-xs italic">Nombre no valido</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Correo
                            </label>
                            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.userEmail && 'border-red-500'}`} id="email" type="text" placeholder="Email" autoComplete="false" {...register("userEmail", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
                            {errors.userEmail && <p className="text-red-500 text-xs italic">Correo no valido</p>}
                        </div>
                        {rfc === "Empresa" && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="RFC">
                                    RFC
                                </label>

                                <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.userRFC && 'border-red-500'}`} id="RFC" type="text" placeholder="RFC" autoComplete="false" {...register("userRFC", { pattern: /^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/ })} />
                                {errors.userRFC && <p className="text-red-500 text-xs italic">RFC no válido.</p> /* aqui en el error pon el nombre de este */}
                            </div>
                        )}
                        {rfc === "Egresado" && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Cedula
                                </label>
                                {!stateFile && <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.userCedula && 'border-red-500'}`} id="username" type="button" value="Insertar Cedula" onClick={() => {
                                    const file = document.querySelector("#certf")
                                    file.click()
                                }} />}
                                {stateFile && (
                                    <div className={`p-4 mb-4 text-sm text-lime-600 bg-lime-200 rounded-lg col-span-2 text-cente`} role="alert">
                                        <span className="font-medium">Exito!!</span> Se ha subido correctamente el archivo {fileName} <a href="#" onClick={() => setStateFile(false)} className="hover:text-lime-700">Elejir uno nuevo</a>
                                    </div>
                                )}
                                <input className="hidden" type="file" id="certf" name="certf" {...register("userCedula", { pattern: /(.jpg|.jpeg|.pdf)$/i })} onChange={handlerFile} />
                                {!stateFile && <p className="text-red-500 text-xs italic">Cédula no válida.</p>}
                            </div>
                        )}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password1 && 'border-red-500'}`} id="password" name="password" type="password" placeholder="******************" {...register("password1", { required: true, pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20}$/ })} />
                            {errors.password1 && <p className="text-red-500 text-xs italic">Please choose a password.</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
                                Confirmar Contraseña
                            </label>
                            <input className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password2 && 'border-red-500'}`} id="password2" name="password2" type="password" placeholder="******************" {...register("password2", { required: true, pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20}$/ })} />
                            {errors.password2 && <p className="text-red-500 text-xs italic">Please choose a password.</p>}
                            {errorPassword && <p className="text-red-500 text-xs italic">Las contraseñas no coinciden</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            {!hideButton && <button className="bg-amber-200  hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                Sign Up
                            </button>}
                            {hideButton && <Spinners />}
                            <Link href={"/"} legacyBehavior><a className="inline-block align-baseline  font-bold text-sm text-gray-400 hover:text-amber-300" href="#">
                                Regresar </a></Link>
                            <Link href="/login" legacyBehavior><a className="inline-block align-baseline font-bold text-sm text-amber-200 hover:text-gray-400" href="#">
                                Sign In
                            </a></Link>
                        </div>
                        {(dublEmail || longUserName || serverError) && <br />}
                        {dublEmail && (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span className="font-medium">Error!!</span> El correo ingresado ya existe
                            </div>
                        )}
                        {longUserName && (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span className="font-medium">Error!!</span> El nombre del usaurio es demasiado grande
                            </div>
                        )}
                        {serverError && (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span className="font-medium">Error!!</span> Error del servidor
                            </div>
                        )}
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2022 BEE Assistant
                    </p>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user")

    if (user !== undefined) {
        res.setHeader("location", "/user/home")
        res.statusCode = 302
        res.end()
        return { props: {} }
    }

    return {
        props: {}
    }

})