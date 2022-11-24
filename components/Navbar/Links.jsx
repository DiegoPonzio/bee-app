import Link from "next/link"
import { useState } from "react"
import { BsChevronUp, BsChevronDown } from "react-icons/bs"
import { links } from "../../clientServices/links"

export default function Links() {


    const [heading, setHeading] = useState("")

    return (
        <>
            {
                links.map(link => (
                    <div key={link.name}>
                        <div className="px-3 text-left  md:cursor-pointer group">
                            <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5 group" onClick={() => heading !== link.name ? setHeading(link.name) : setHeading("")}>
                                {link.name}
                                <span className="text-xl md:hidden inline">
                                    {heading === link.name ? <BsChevronUp /> : <BsChevronDown />}
                                </span>
                                <span className="text-xl md:mt-1 md:ml-2 md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                                    <BsChevronDown />
                                </span>
                            </h1>
                            {link.subMenu && (<div>
                                <div>
                                    <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                        <div className="bg-white p-3.5 z-40 relative">
                                            {
                                                link.subLinks.map(sublink => (
                                                    <div key={sublink.name}>
                                                        <li className="text-sm text-gray-600 my-2.5">
                                                            <Link href={sublink.link} legacyBehavior><a className="hover:text-orange-900">{sublink.name}</a></Link>
                                                        </li>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                        {/* mobile menues */}
                        <div className={`${heading === link.name ? 'md:hidden' : 'hidden'}`}>
                            {link.subMenu && link.subLinks.map(sublink => (
                                <div key={sublink.name}>
                                    <div>
                                        <div>
                                            <li className="py-3 pl-14">
                                                <a href={sublink.link} className="text-orange-400 hover:text-orange-900">{sublink.name}</a>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </>
    )
}