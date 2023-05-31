import { useForm } from "react-hook-form"
import { useState } from "react";
import Router from "next/router";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import Spinners from "./Spinners";

export default function Loggin() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [hideButton, setHideButton] = useState(false)

    const actioHandler = async e => {
        //e.preventDefault()
        const { username, password } = e

        setHideButton(true)
        const res = await axios.post('/api/auth', {
            username,
            password
        }).then(Veryfy)
            .catch(() => NotificationManager.error("Error al iniciar sesión", "Error", 5000));
    }

    const Veryfy = async (status) => {
        try {
            if (await status !== null) {
                const data = await status.data
                if (data !== undefined) {
                    const { data } = status
                    if (data.status === 401) {
                        NotificationManager.error("Usuario o contraseña incorrectos", "Error", 5000);
                    } else if (data.status === 200) {
                        console.log(data.status.userType)
                        data.userType === 4 ? Router.replace("/") : Router.replace("/user/home")
                    } else if (data.status === 408) {
                        console.log(data)
                        NotificationManager.error("Usuario no verificado", "Error", 5000);
                    }
                }
            }
            setHideButton(false)
        } catch (err) {
            NotificationManager.error("Error al iniciar sesión", "Error", 5000);
        }
    }

    return (
        <div className='grid h-screen w-full grid-cols-2 overflow-hidden'>
            <div className='flex h-full w-full items-center justify-center bg-yellow-10'>
                <div className='flex h-2/3 w-1/2 flex-col gap-5 bg-white p-4 shadow-lg'>
                    <h3 className='text-center text-3xl font-bold'>Iniciar Sesion</h3>
                    <form className='flex h-full w-full flex-col items-center gap-5' onSubmit={handleSubmit(actioHandler)} >
                        <div className='flex w-full flex-col gap-3 p-3'>
                            <label className='font-semibold' htmlFor='nombre'>
                                Correo Electronico
                            </label>
                            <input className={`border-b-2 bg-transparent ${errors.username ? "border-red-500" : "border-black"}`} {...register("username", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
                            {errors.username && <p className="text-red-500 text-xs italic">Correo no valido</p>}
                        </div>
                        <div className='flex w-full flex-col gap-3 p-3'>
                            <label className='font-semibold' htmlFor='nombre'>
                                Contraseña
                            </label>
                            <input className={`border-b-2 bg-transparent ${errors.password ? "border-red-500" : "border-black"}`} type="password" placeholder="******************" {...register("password", { required: true })} />
                            {errors.password && <p className="text-red-500 text-xs italic">Contraseña no valido</p>}
                        </div>
                        {!hideButton ? (
                            <button className='w-3/4 bg-[#1A1A1A] mt-10 py-1 text-center font-semibold text-yellow-10'>
                                Log in
                            </button>
                        ): <Spinners />}
                    </form>
                </div>
            </div>
            <div className='flex h-full w-full items-center'>
                <div className='border-l-[25vh] border-t-[50vh] border-b-[50vh] border-l-yellow-10 border-t-transparent border-b-transparent' />
                <div className='flex h-full w-full flex-col items-center gap-10 p-10 '>
                    <div className='text-center text-4xl font-bold text-yellow-10'>
                        <h2>¿Aun no tienes cuenta?</h2>
                        <h2>Registrate</h2>
                    </div>
                    <div className='flex w-3/5 flex-col gap-2 rounded-md border-2 py-2 px-5'>
                        <p className='text-lg font-bold text-white'>Empresa</p>
                        <p className='text-white'>
                            Si tienes tu propia empresa y quieres venir a dar a conocer tu
                            trabajo o buscar pasantes este es tu usuario
                        </p>
                        <div className='flex w-full justify-end text-white'>{'--->'}</div>
                    </div>
                    <div className='flex w-3/5 flex-col gap-2 rounded-md border-2 py-2 px-5'>
                        <p className='text-lg font-bold text-white'>Empresa</p>
                        <p className='text-white'>
                            Si eres egresadi dek IPN y quisieras dar una platica o curso
                            dentro de algun CECyT este es tu usuario
                        </p>
                        <div className='flex w-full justify-end text-white'>{'--->'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}