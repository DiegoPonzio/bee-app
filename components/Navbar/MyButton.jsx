import { BiUserCircle } from 'react-icons/bi'
import { useState } from 'react'
import Link from 'next/link'

export default function Mybutton() {
    //const router = useRouter()
    const [heading, setHeading] = useState("")

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
                                    <li className='text-sm text-gray-600 my-2.5' onClick={ () => window.location.reload()}>
                                        <Link href={"/api/outCecyt"} legacyBehavior><a className='hover:text-orange-900'>Elejir CECyT</a></Link>
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
                                        <Link href={"/api/outCecyt"} legacyBehavior><a className='hover:text-orange-900'>Elejir CECyT</a></Link>
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