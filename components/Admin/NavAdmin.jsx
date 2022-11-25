import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import Router from 'next/router'
import { NotificationManager } from 'react-notifications'

export default function NavAdmin({ type }) {
  const [status, setStatus] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function disableScroll() {
      window.scrollTo(0, 0)
    }
    if (open) {
      window.addEventListener('scroll', disableScroll);
    }
    return () => {
      window.removeEventListener("scroll", disableScroll)
    }

  }, [open])

  useEffect(() => {
    const handlerScroll = () => {
      if (window.scrollY > 0 && !open) {
        setStatus(true)
      } else {
        setStatus(false)
      }
    }
    window.addEventListener("scroll", handlerScroll)

    return () => {
      window.removeEventListener("scroll", handlerScroll)
    }
  }, [open])

  const logOut = async () => {
    const res = await axios.get('/api/logout')
      .then(() => Router.replace('/'))
      .catch(() => NotificationManager.error('Error!!', 'Ocurrio un problema al eliminar', 5000))
  }

  return (
    <nav className={`bg-amber-300 z-50 ${status && "fixed w-full"}`}>
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <h2 className="text-7xl cursor-pointer"><Link href={"/user/home"} legacyBehavior>BEE+</Link></h2>
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </div>
        </div>
        <div>
        </div>
        <ul className={type === 1 ? "md:flex hidden uppercase items-center gap-8 font-[Poppins]" : "hidden"}>
          <li><Link href="/user/admin/Solicitudes" legacyBehavior><a className="text-black  hover:text-yellow-200">Solicitudes</a></Link></li>
          <li><Link href="/user/home" legacyBehavior><a className="text-black  hover:text-yellow-200">Publicaciones</a></Link></li>
        </ul>
        <div className="md:flex hidden uppercase items-end gap-8">
          <Link href="/api/logout" legacyBehavior><a className="text-black  hover:text-yellow-200 ">
            <BiUserCircle size={50} />
            <span className="sr-only">Usuario</span>
          </a></Link>
        </div>
        {/*mobile navbar*/}
        <ul className={`md:hidden bg-amber-300 absolute w-full h-full bottom-0 py-24 pl-4 duration-500 z-20 ${open ? 'left-0' : 'left-[-100%]'}`}>
          <li><Link href="/user/admin/Solicitudes" legacyBehavior><a className="text-black  hover:text-yellow-200">Solicitudes</a></Link></li>
          <li><Link href="/user/home" legacyBehavior><a className="text-black  hover:text-yellow-200">Publicaciones</a></Link></li>
          <div className="md:hidden flex uppercase items-end gap-8">
            <form onSubmit={ () => logOut()}></form>
            <button type="submit">
              <BiUserCircle size={50} />
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
}
