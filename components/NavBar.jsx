import Link from "next/link"
import { useState } from "react"
import Links from "./Navbar/Links"
import Mybutton from "./Navbar/MyButton"
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import LinksCecyt from "./Navbar/LinksCecyt"

export default function NavBar({ carrear, isLikes }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className={`bg-amber-300 z-50 fixed w-full`}>
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 w-full flex justify-between items-center">
          <h2 className="text-7xl cursor-pointer">{
            carrear ? <Link href={"/"} legacyBehavior>BEE+</Link> : <a href={"/principal"}>BEE+</a>
          }</h2>
          <div className="text-3xl " onClick={() => setOpen(!open)}>
            {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </div>
        </div>
        
        {/*mobile navbar*/}
        <ul className={`fixed bg-amber-300 w-full sm:w-3/5 md:w-2/5 lg:1/3 xl:w-1/5 h-full bottom-0 py-24 pl-4 duration-1000 z-0 ${open ? 'left-0' : 'left-[-100%]'} overflow-y-scroll scrollbar-none pt-20`}>
          {carrear && <Links></Links>}
          {carrear && <LinksCecyt carrear={carrear}></LinksCecyt>}
          <li className="px-3 text-left"><Link href={'/us/politics'} legacyBehavior><a className="py-7 px-3 inline-block">Políticas</a></Link></li>
          <li className="px-3 text-left"><Link href={'/us/nosotros'} legacyBehavior><a className="py-7 px-3 inline-block">Conócenos</a></Link></li>
          <div className="py-5">
            <Mybutton isLikes={isLikes} />
          </div>
        </ul>
      </div>
    </nav>
  )
}