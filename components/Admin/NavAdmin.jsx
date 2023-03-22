import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import Router from 'next/router'
import { NotificationManager } from 'react-notifications'

export default function NavAdmin({ children }) {

  const logOut = async () => {
    const res = await axios.get('/api/logout')
      .then(() => Router.replace('/'))
      .catch(() => NotificationManager.error('¡Error!', 'Ocurrió un problema', 5000))
  }
  

  return (
    <>
      <nav className={`fixed bg-amber-300 z-50 w-full h-16`}>
        <div className="grid grid-cols-2 font-medium">
          <div className="z-50 p-3 md:w-auto w-full flex justify-start">
            <h2 className="text-5xl cursor-pointer"><Link href={"/"} legacyBehavior>BEE+</Link></h2>
          </div>
          <div className="flex uppercase items-end gap-5 justify-end p-3">
            <button type="submit" onClick={() => logOut()} className={"hover:text-yellow-200"}>
              <BiUserCircle className="text-5xl" />
            </button>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </>
  );
}
