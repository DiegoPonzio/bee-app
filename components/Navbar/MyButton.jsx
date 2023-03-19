import { BiUserCircle } from 'react-icons/bi'
import { useState } from 'react'
import useUser from '../../lib/user'
import { NotificationManager } from 'react-notifications'
import Router from 'next/router'
import axios from 'axios'

export default function Mybutton() {
    //const router = useRouter()
    const [heading, setHeading] = useState("")
    const [user, message] = useUser()
    const logOut = async () => {
        const res = await axios.get('/api/outCecyt')
            .then(() => Router.replace('/principal/cecyts'))
            .catch(() => NotificationManager.error('Error!!', 'Ocurrio un problema', 5000))
    }

    return (
        <div className="px-3 text-left  group">
            <button className="bg-transparent" onClick={() => heading !== "user" ? setHeading("user") : setHeading("")}>
                <div className='text-5xl text-gray-600 my-2.5 hover:text-yellow-200'>
                    <h1>
                        <BiUserCircle size={50} />
                    </h1>
                </div>
            </button>
            <div>
                {/* mobile app */}
                <div className={`${heading === "user" ? '' : 'hidden'}`}>
                    <div>
                        <div>
                            <div>
                                <ul>
                                    {!user && (
                                        <>
                                            <li className='text-sm py-3 pl-14'>
                                                <a className='hover:text-orange-900' href={"/login"}>Iniciar Sesión</a>
                                            </li>
                                            <li className='text-sm py-3 pl-14'>
                                                <a href={"/signup"} className='hover:text-orange-900'>Registarse</a>
                                            </li>
                                        </>
                                    )}
                                    {user && (
                                        <>
                                            <li className='text-sm py-3 pl-14'>
                                                <a className='hover:text-orange-900' href={"/login"}>Mis likes</a>
                                            </li>
                                            <li className='text-sm py-3 pl-14'>
                                                <a className='hover:text-orange-900' href={"/user/home"}>Mi Cuenta</a>
                                            </li>
                                        </>
                                    )}
                                    <li className='py-3 pl-14'>
                                        <button className={"hover:text-orange-900"} onClick={() => logOut()} >
                                            Elegir Institución
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}