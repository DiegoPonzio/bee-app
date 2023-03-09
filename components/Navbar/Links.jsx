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
                        <div className="px-3 text-left cursor-pointer group">
                            <h1 className="py-7 flex justify-between items-center pr-5 group" onClick={() => heading !== link.name ? setHeading(link.name) : setHeading("")}>
                                {link.name}
                                <span className="text-xl inline">
                                    {heading === link.name ? <BsChevronUp /> : <BsChevronDown />}
                                </span>
                                
                            </h1>
                        </div>
                        <div className={`${heading === link.name ? '' : 'hidden'}`}>
                            {link.subMenu && link.subLinks.map(sublink => (
                                <div key={sublink.name}>
                                    <div>
                                        <div>
                                            <li className="py-3 pl-14">
                                                <a href={sublink.link} className=" hover:text-orange-900">{sublink.name}</a>
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