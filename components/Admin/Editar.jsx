import { FiEdit } from "react-icons/fi";
import { BsTrash } from 'react-icons/bs'
import { useEffect, useState } from "react";
import Router from "next/router";
import { NotificationManager } from 'react-notifications'
import axios from "axios";
import Banner404 from "../../components/Banners/Banner";
import { errores } from "../../clientServices/errores";
import { useForm } from "react-hook-form";

export default function Editar({ id, user }) {

  const [post, setPost] = useState()
  const [error404, setError404] = useState(false)
  const { status, nombre, descripcion } = errores[1]
  const URL = `https://bee-app.herokuapp.com/api/showAll/byId/${id}`
  const re = /:[0-9]{2}.[0-9]{3}Z/

  const { register, formState: { errors }, handleSubmit } = useForm();

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
      .then(() => NotificationManager.success('Se ha eliminado correctamente', 'Exito!!', 5000))
      .catch(() => NotificationManager.error('Ocurrió un problema al eliminar', 'Error!!', 5000))
  }

  const actionHandler = async e => {
    //console.log(e);
    Router.replace("/user/home")
    const {descripcion, desde, hasta, lugar, nombre, organizador, publicacion, url} = e
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
    .then(() => NotificationManager.success('Se ha actualizado Correctamente', 'Exito!!', 5000))
    .catch(() => NotificationManager.error('Ocurrio un problema al eliminar', 'Error!!', 5000))
  }

  return (
    <>
      <div className="items-center bg-amber-300 p-10 mb-3 rounded-md ">
        {post && !error404 && (
          <>
            <div className="mb-6 cursor-pointer">
              <FiEdit className="float-left mr-4" size={30} />{" "}
              <h2 className="text-3xl ml-4 ">Editar Comunicado {` ${id}`}</h2>
            </div>
            <div>
              <form className="grid gird-cols-1 lg:grid-cols-2 gap-10" onSubmit={handleSubmit(actionHandler)}>
                <div className="grid gap-6 mb-2 lg:mb-8">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Nombre del comunicado:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.nombre && 'border-red-500'}`}
                      placeholder="comunicado/evento"
                      defaultValue={post.pub_titulo}
                      {...register("nombre", { required: true, maxLength: 50, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })}
                    />
                    {errors.nombre && <p className="text-red-500 text-xs italic">El nombre del evento no es válido</p>}
                    {errors.nombre?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El nombre del evento es muy largo, debe ser menor a 50 caracteres</p>}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      Descripción de la actividad:
                    </label>
                    <textarea
                      id="descripcion"
                      rows="4"
                      className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${errors.descripcion && 'border-red-500'}`}
                      placeholder="Descripcion detallada del evento (de qué trata, características, requerimientos, etc)"
                      defaultValue={post.pub_descripcion}
                      {...register("descripcion", { required: true, maxLength: 300 })}
                    ></textarea>
                    {errors.descripcion && <p className="text-red-500 text-xs italic">La descripción de la actividad es requerida</p>}
                    {errors.descripcion?.type === 'maxLength' && <p className="text-red-500 text-xs italic">La descripción es muy larga, debe ser menor a 300 caracteres</p>}
                  </div>
                </div>
                <div>
                  <div className="grid gap-6 mb-8 md:grid-cols-2">
                    <div>
                      <label htmlFor="desde" className="block mb-2 text-sm font-medium text-gray-900">Desde: </label>
                      <input
                        type="datetime-local"
                        id="desde"
                        defaultValue= {post.pub_horainicio.split(re)[0]}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.desde && 'border-red-500'}`}
                        {...register("desde", { required: true })}
                      />
                      <p className="text-gray-900 text-xs italic">Fecha Desde guardada anteriormente: {post.pub_horainicio}</p>
                      {errors.desde && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="hasta"
                        className="block mb-2 text-sm font-medium text-gray-900">Hasta: </label>
                      <input type="datetime-local" id="hasta"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.hasta && 'border-red-500'}`}
                        {...register("hasta", { required: true })}
                      />
                      <p className="text-gray-900 text-xs italic">Fecha Hasta guardada anteriormente: {post.pub_horafinal}</p>
                      {errors.hasta && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="website"
                        className="block mb-2 text-sm font-medium text-gray-900">Fecha de publicación: </label>
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
                        className="block mb-2 text-sm font-medium text-gray-900">Lugar/Cede: </label>
                      <input
                        type="text"
                        id="lugar"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.lugar && 'border-red-500'}`}
                        defaultValue={post.pub_locacion}
                        placeholder="Centro Cultural Jaime Torres Bodet"
                        {...register("lugar", { required: true, maxLength: 100 })}
                      />
                      {errors.lugar && <p className="text-red-500 text-xs italic">El lugar es requerido</p>}
                      {errors.lugar?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El lugar es muy largo, debe ser menor a 100 caracteres</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="dirigido"
                        className="block mb-2 text-sm font-medium text-gray-900">Organizador/Encargado: </label>
                      <input
                        type="text"
                        id="organizador"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.organizador && 'border-red-500'}`}
                        placeholder="Introduce tu nombre o el de empresa"
                        defaultValue={post.pub_encargado}
                        {...register("organizador", { required: true, maxLength: 60, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })} />
                      {errors.organizador && <p className="text-red-500 text-xs italic">El organizador no es válido</p>}
                      {errors.organizador?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El organizador/encargado es muy largo, debe ser menor a 60 caracteres</p>}
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900">Url: </label>
                      <input
                        type="url"
                        id="url"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.url && 'border-red-500'}`}
                        placeholder="https://www.cecyt9.ipn.mx/"
                        defaultValue={post.pub_fuente}
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
                      type="reset"
                      className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Borrar</button>
                    <div className="col-span-2">
                      <BsTrash className="float-right mt-2 cursor-pointer" size={30} onClick={() => onDelete()} />
                    </div> 
                  </div>
                </div>
              </form>
            </div>
            <br></br>
            <br></br>
            <br></br>
          </>
        )}
      </div>
      {error404 && !post && (
        <div className="place-content-center min-h-screen flex items-center justify-center col-span-2">
          <Banner404 error={status} title={nombre} desc={descripcion} />
        </div>
      )}
    </>
  )
}