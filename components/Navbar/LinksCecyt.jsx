import Link from "next/link"
import { useState } from "react"
import { BsChevronUp, BsChevronDown } from "react-icons/bs"

export default function LinksCecyt({ carrear }) {

    const [heading, setHeading] = useState("")

    return (
        <>
            {
                <div key={'De Carrera'}>
                    <div className="px-3 text-left  md:cursor-pointer group">
                        <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5 group" onClick={() => heading !== "De Carrera" ? setHeading("De Carrera") : setHeading("")}>
                            De Carrera
                            <span className="text-xl md:hidden inline">
                                {heading === "De Carrera" ? <BsChevronUp /> : <BsChevronDown />}
                            </span>
                            <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                                <BsChevronDown />
                            </span>
                        </h1>
                        <div>
                            <div>
                                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                    <div className="py-3">
                                        <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                    </div>
                                    <div className="bg-white p-3.5 z-40 relative">
                                        {
                                            carrear.map(sublink => (
                                                <div key={sublink.id}>
                                                    <li className="text-sm text-gray-600 my-2.5">
                                                        <Link href={`/De Carrera/${sublink.id}`}><a className="hover:text-orange-900">{sublink.name}</a></Link>
                                                    </li>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* mobile menues */}
                    <div className={`${heading === "De Carrera" ? 'md:hidden' : 'hidden'}`}>
                        { carrear.map(sublink => (
                            <div key={sublink.id}>
                                <div>
                                    <div>
                                        <li className="py-3 pl-14">
                                            <a href={`/De Carrera/${sublink.name}`} className="text-orange-400 hover:text-orange-900">{sublink.name}</a>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}