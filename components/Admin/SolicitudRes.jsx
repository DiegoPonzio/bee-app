import { TiTick } from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import { useState } from 'react'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import Router from 'next/router'

export default function SolicitudRes({ id }) {
  const [state, setState] = useState(false)
  const URL = `https://bee-app.herokuapp.com/api/showAll/temp/byId/${id}`

  const onCheck = async () => {
    Router.push("/user/admin/Solicitudes")
    const res = axios.put("/api/upatePropost", {
      id,
      status: 2
    })
      .then(() => NotificationManager.success('Solicitud aceptada', 'Exito!!', 5000))
      .catch(() => NotificationManager.error('Error!!', 'Ocurrio un problema al eliminar', 5000))
  }

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 align-middle">
          {state && (
            <>
              <textarea
                id="comentario"
                rows="4"
                className={` col-span-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Retroalimentacion o comentarios para el solicitante"
              ></textarea>
              <button
                type="submit"
                className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center"

              >Agregar</button>
            </>
          )}
          <div className='flex items-center justify-between'>
            <div className='float-left'>
              <TiTick size={100} color={"green"} onClick={() => {
                setState(false)
                onCheck()
              }} />
              <span className="sr-only">aceptar</span>
            </div>
            <div className='float-left'>
              <ImCross size={50} color={"red"} onClick={() => setState(true)} />
              <span className="sr-only">negar</span>
            </div>
          </div>
        </div>
    </>
  )

}