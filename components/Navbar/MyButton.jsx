import { BiUserCircle } from 'react-icons/bi'
import { useState } from 'react'
import Link from 'next/link'
import { NotificationManager } from 'react-notifications'
import Router from 'next/router'

export default function Mybutton() {
    //const router = useRouter()
    const [heading, setHeading] = useState("")
    const logOut = async () => {
        const res = await axios.get('/api/outCecyt')
            .then(() => Router.replace('/principal'))
            .catch(() => NotificationManager.error('Error!!', 'Ocurrio un problema', 5000))
    }


    return (
        <div className="px-3 text-left  md:cursor-pointer group">
            <button className="bg-transparent" onClick={() => heading !== "user" ? setHeading("user") : setHeading("")}>
                <div className='text-5xl text-gray-600 my-2.5 hover:text-yellow-200'>
                    <h1>
                        <BiUserCircle size={50} />
                    </h1>
                </div>
            </button>
            <div>
                <div>
                    <div className=' absolute top-20 hidden group-hover:md:block hover:md:block'>
                        <div className='py-3'>
                            <div className='w-4 h-4 left-3 absolute mt-1 bg-white rotate-45'></div>
                        </div>
                        <div className='bg-white p-3.5 z-40 relative'>
                            <div>
                                <ul>
                                    <li className='text-sm text-gray-600 my-2.5'>
                                        <Link href={"/login"} legacyBehavior><a className='hover:text-orange-900'>Iniciar Sesion</a></Link>
                                    </li>
                                    <li className='text-sm text-gray-600 my-2.5'>
                                        <Link href={"/signout"} legacyBehavior><a className='hover:text-orange-900'>Registarse</a></Link>
                                    </li>
                                    <li className='text-sm text-gray-600 my-2.5' onClick={() => logOut()}>
                                        {/* className='hover:text-orange-900' */}
                                        <div className={"hover:text-orange-900"} >
                                            Elejir CECyT
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* mobile app */}
                <div className={`${heading === "user" ? 'md:hidden' : 'hidden'}`}>
                    <div>
                        <div>
                            <div>
                                <ul>
                                    <li className='py-3 pl-14'>
                                        <Link href={"/login"} legacyBehavior><a className='hover:text-orange-900'>Iniciar Sesion</a></Link>
                                    </li>
                                    <li className='py-3 pl-14'>
                                        <Link href={"/signout"} legacyBehavior><a className='hover:text-orange-900'>Registarse</a></Link>
                                    </li>
                                    <li className='py-3 pl-14'>
                                        <button className={"hover:text-orange-900"}  onClick={() => logOut()} >
                                            Elejir CECyT
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