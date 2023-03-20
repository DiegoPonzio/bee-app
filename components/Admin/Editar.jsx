import { FiEdit } from "react-icons/fi";
import { BsTrash } from 'react-icons/bs'
import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { NotificationManager } from 'react-notifications'
import axios from "axios";
import { errores } from "../../clientServices/errores";
import { useForm } from "react-hook-form";
import { useEditPost } from "../../clientServices/hamburger";

export default function Editar({ id, user }) {
  const ctx = useContext(useEditPost)
  const { setSelectedEdit, setPostsList } = ctx
  const [post, setPost] = useState()
  const [error404, setError404] = useState(false)
  const { status, nombre, descripcion } = errores[1]
  const URL = `https://bee-app.herokuapp.com/api/showAll/byId/${id}`
  const re = /:[0-9]{2}.[0-9]{3}Z/

  const { register, formState: { errors }, handleSubmit, watch } = useForm();

  const fetchPost = async () => {
    const response = await fetch(URL)
      .then(response => response.json())
      .then(responseJson => setPost(responseJson.result))
      .catch(() => setError404(true))
  }

  useEffect(() => {
    !post && fetchPost()
  })

  const onDelete = async () => {
    Router.replace("/user/home")
    const res = await axios.delete(`/api/deletePost/${id}`)
      .then(() => {
        NotificationManager.success('Se ha eliminado correctamente', 'Exito!!', 5000)
        setPostsList(false)
        setSelectedEdit("") 
      })
      .catch(() => NotificationManager.error('Ocurrió un problema al eliminar', 'Error!!', 5000))
  }

  const actionHandler = async e => {
    //console.log(e);
    Router.replace("/user/home")
    const { descripcion, desde, hasta, lugar, nombre, organizador, publicacion, url } = e
    const res = await axios.put(`/api/updatePost`, {
      descripcion,
      desde,
      hasta,
      lugar,
      nombre,
      organizador,
      publicacion,
      url,
      id,
      user
    })
      .then(() => {
        NotificationManager.success('Se ha actualizado Correctamente', 'Exito!!', 5000)
        setSelectedEdit("")
        setPostsList(false)
      })
      .catch(() => NotificationManager.error('Ocurrio un problema al eliminar', 'Error!!', 5000))
  }

  return (
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={"fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full items-center justify-center flex"}>
      <div className="bg-[#4A4444] p-5 mb-1 rounded-md w-auto md:w-4/5 h-auto">
        <div className="mb-6 cursor-pointer text-[#FCE155] flex">
          <FiEdit className="float-left mr-4" size={30} />{" "}
          <h2 className="text-3xl ml-4 ">Editar Comunicado {` ${id}`}</h2>
          <button type="button" className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="authentication-modal" onClick={() => setSelectedEdit("")}>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div>
          <form className="grid gird-cols-1 lg:grid-cols-2 gap-10" onSubmit={handleSubmit(actionHandler)}>
            <div className="grid gap-6 mb-2 lg:mb-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white">
                  Nombre del comunicado:
                </label>
                <input
                  type="text"
                  id="nombre"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.nombre && 'border-red-500'}`}
                  placeholder="comunicado/evento"
                  defaultValue={post?.pub_titulo}
                  {...register("nombre", { required: true, maxLength: 50, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })}
                />
                {errors.nombre && <p className="text-red-500 text-xs italic">El nombre del evento no es válido</p>}
                {errors.nombre?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El nombre del evento es muy largo, debe ser menor a 50 caracteres</p>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-white">
                  Descripción de la actividad:
                </label>
                <textarea
                  id="descripcion"
                  rows="4"
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${errors.descripcion && 'border-red-500'}`}
                  placeholder="Descripcion detallada del evento (de qué trata, características, requerimientos, etc)"
                  defaultValue={post?.pub_descripcion}
                  {...register("descripcion", { required: true, maxLength: 300 })}
                ></textarea>
                {errors.descripcion && <p className="text-red-500 text-xs italic">La descripción de la actividad es requerida</p>}
                {errors.descripcion?.type === 'maxLength' && <p className="text-red-500 text-xs italic">La descripción es muy larga, debe ser menor a 300 caracteres</p>}
              </div>
            </div>
            <div>
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <div>
                  <label htmlFor="desde" className="block mb-2 text-sm font-medium text-white">Desde: </label>
                  <input
                    type="datetime-local"
                    id="desde"
                    defaultValue={post?.pub_horainicio.split(re)[0]}
                    min={post?.pub_horainicio.split(re)[0]}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.desde && 'border-red-500'}`}
                    {...register("desde", { required: true })}
                  />
                  {errors.desde && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
                </div>
                <div>
                  <label
                    htmlFor="hasta"
                    className="block mb-2 text-sm font-medium text-white">Hasta: </label>
                  <input type="datetime-local" id="hasta"
                    defaultValue={post?.pub_horafinal.split(re)[0]}
                    min={watch('desde')}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.hasta && 'border-red-500'}`}
                    {...register("hasta", { required: true })}
                  />
                  {errors.hasta && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-white">Fecha de publicación: </label>
                  <input
                    type="date"
                    id="publicacion"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.publicacion && 'border-red-500'}`}
                    {...register("publicacion", { required: true })}
                  />
                  {errors.userName && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
                </div>
                <div>
                  <label
                    htmlFor="visitors"
                    className="block mb-2 text-sm font-medium text-white">Lugar/Cede: </label>
                  <input
                    type="text"
                    id="lugar"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.lugar && 'border-red-500'}`}
                    defaultValue={post?.pub_locacion}
                    placeholder="Centro Cultural Jaime Torres Bodet"
                    {...register("lugar", { required: true, maxLength: 100 })}
                  />
                  {errors.lugar && <p className="text-red-500 text-xs italic">El lugar es requerido</p>}
                  {errors.lugar?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El lugar es muy largo, debe ser menor a 100 caracteres</p>}
                </div>
                <div>
                  <label
                    htmlFor="dirigido"
                    className="block mb-2 text-sm font-medium text-white">Organizador/Encargado: </label>
                  <input
                    type="text"
                    id="organizador"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.organizador && 'border-red-500'}`}
                    placeholder="Introduce tu nombre o el de empresa"
                    defaultValue={post?.pub_encargado}
                    {...register("organizador", { required: true, maxLength: 60, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })} />
                  {errors.organizador && <p className="text-red-500 text-xs italic">El organizador no es válido</p>}
                  {errors.organizador?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El organizador/encargado es muy largo, debe ser menor a 60 caracteres</p>}
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-white">Url: </label>
                  <input
                    type="url"
                    id="url"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.url && 'border-red-500'}`}
                    placeholder="https://www.cecyt9.ipn.mx/"
                    defaultValue={post?.pub_fuente}
                    {...register("url", { required: true, maxLength: 100, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ })} />
                  {errors.url && <p className="text-red-500 text-xs italic">El URL no es válido</p>}
                  {errors.url?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El URL es muy largo, debe ser menor a 100 caracteres</p>}
                </div>
              </div>
              <div className="grid gap-6 mb-8 md:grid-cols-2 justify">
                <button
                  type="submit"
                  className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Agregar</button>
                <button
                  id="reset"
                  className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center" onClick={() => setSelectedEdit("")}>Cancelar</button>
                <div className="col-span-2">
                  <BsTrash className="float-right mt-2 cursor-pointer" size={30} onClick={() => onDelete()} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}