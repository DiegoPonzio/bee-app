import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { useState } from "react";
import { cecyts } from "../../clientServices/Cecyts";
import { useForm } from "react-hook-form";
import Spinners from "../Spinners"
import Upload from "./Upload";
import { useFile } from "../../clientServices/hamburger";

export default function Solicitud({ user }) {

  //const [state, setState] = useState(false)
  //const [state2, setState2] = useState(false)
  //const [open, setOpen] = useState(false)
  const [espState, setEspState] = useState("")
  //const [file, setFile] = useState()
  //const [stateFile, setStateFile] = useState(false)
  //const [fileName, setFileName] = useState("")
  //const [errorStatus, setErrorStatus] = useState(false)
  //const [errorTitle, setErrorTitle] = useState(false)
  //const [errorDesc, setErrorDesc] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const re = /:[0-9]{2}.[0-9]{3}Z/

  const tt = Date.now();
  const hoy = new Date(tt);
  const hoyString = hoy.toISOString().toString();

  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const escuela = watch("escuela")


  const especialidadesFetch = (value) => {
    try {
      const ragex = /(\d+)/g;
      const id = escuela.match(ragex)
      const id_list = Number(id[0])
      switch (value) {
        case "Escolar":
          const { escolar } = cecyts[id_list - 1].area
          setEspState(escolar);
          break
        case "Extracurricular":
          const { extracurricular } = cecyts[id_list - 1].area
          setEspState(extracurricular);
          break
        case "De Carrera":
          const { DeCarrera } = cecyts[id_list - 1].area
          setEspState(DeCarrera);
          break
      }
    } catch (error) {
      const areas = document.querySelector('#areaSelect')
      areas.disabled
    }
  }

  const Veryfy = (status) => {
    console.log(status);
    setLoading(true)
    if (status.data.status === 200) {
      const reset = document.querySelector('#reset')
      reset.click()
      NotificationManager.success('Comunicado agregado correctamente', '¡Éxito!', 5000);
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_media' at row 1") {
      NotificationManager.error('El nombre del archivo es muy largo', '¡Error!', 5000);
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_titulo' at row 1") {
      NotificationManager.error('El nombre del comunicado es muy largo', '¡Error!', 5000);
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_descripcion' at row 1") {
      NotificationManager.error('La descripción del comunicado es muy larga', '¡Error!', 5000);
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_url' at row 1") {
      NotificationManager.error('La URL es muy larga', '¡Error!', 5000);
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_organizador' at row 1") {
      NotificationManager.error('El nombre del organizador es muy largo', '¡Error!', 5000);
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_lugar' at row 1") {
      NotificationManager.error('El nombre del lugar es muy largo', '¡Error!', 5000);
    }
  }

  const Error = res => {
    setLoading(true)
    const { message } = res
    if (message === "Request failed with status code 413") {
      NotificationManager.error('Ocurrió un problema', '¡Error!', 5000);
    }
  }

  const actionHandler = async e => {
    //console.log(e);
    const { nombre, descripcion, escuela, especialidad, desde, hasta, publicacion, lugar, organizador, url } = e
    setLoading(true)
    if (files.length === 0) {
      NotificationManager.error('No se ha seleccionado ningún archivo', '¡Error!', 5000);
      return
    }

    // primero se gurda el archivo en el servidor
    try {
      const { data } = await axios.post("/api/PostFile", files)
      console.log(data);
      const { fileName } = data
      console.log(fileName);

      const res = await axios.post("/api/savePost", {
        nombre,
        file: fileName,
        desc: descripcion,
        esp: especialidad,
        inicio: desde,
        final: hasta,
        fecha: publicacion,
        lugar,
        org: organizador,
        url: url,
        escuela,
        user
      }).then(Veryfy).catch(Error)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      NotificationManager.error('No se ha podido guardar el archivo', '¡Error!', 5000);
    }
  }

  return (
    <div className="bg-[#4A4444] p-5 mb-1 rounded-md w-auto md:w-4/5 h-auto">
      <form className="md:grid md:gap-5" onSubmit={handleSubmit(actionHandler)}>
        <div className="text-[#FCE155] col-span-2">
          Agregar Comunicado
        </div>
        <div className="grid gap-4 mb-2">
          <div>
            <label
              htmlFor="nameC"
              className="block mb-2 text-sm font-medium text-white">
              Nombre del comunicado:
            </label>
            <input
              type="text"
              id="nombreC"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.nombre && 'border-red-500'}`}
              placeholder="comunicado/evento"
              {...register("nombre", { required: true, maxLength: 50, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })}
            />
            {errors.nombre && <p className="text-red-500 text-xs italic">El nombre del evento no es válido</p>}
            {errors.nombre?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El nombre del evento es muy largo, debe ser menor a 50 caracteres</p>}
          </div>
          <div className={"flex justify-center items-center"}>
            <useFile.Provider value={{ files, setFiles, images, setImages }}>
              <Upload />
            </useFile.Provider>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-white">
              Descripción de la actividad:
            </label>
            <textarea
              id="message"
              rows="4"
              className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${errors.descripcion && 'border-red-500'}`}
              placeholder="Descripcion detallada del evento (de qué trata, características, requerimientos, etc)"
              {...register("descripcion", { required: true, maxLength: 300 })}
            ></textarea>
            {errors.descripcion && <p className="text-red-500 text-xs italic">La descripción no es válida</p>}
          </div>
        </div>
        <div className="grid gap-4 mb-2 md:grid-cols-2">
          <div>
            <label
              htmlFor="dirigido"
              className="block mb-2 text-sm font-medium text-white">
              CECyT</label>
            <select
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.escuela && 'border-red-500'}`}
              id="escuela" {...register("escuela", { required: true })}>
              <option selected disabled>Elije un CECyT: </option>
              {cecyts.map(cecyt => (
                <option key={cecyt.name} defaultValue={cecyt.id}>{cecyt.name}</option>))}
            </select>
            {errors.escuela && <p className="text-red-500 text-xs italic">Selecciona alguna de las escuelas</p>}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-white">Área:</label>
            <select className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.area && 'border-red-500'}`}
              id="area" {...register("area", { required: true })}
              onChange={e => especialidadesFetch(e.target.value)}>
              <option selected disabled>Elija un área</option>
              <option key="a_1" defaultValue="1">Escolar</option>
              <option key="a_2" defaultValue="2">Extracurricular</option>
              <option key="a_3" defaultValue="3">De Carrera</ option>
            </select>
            {errors.area && <p className="text-red-500 text-xs italic">Selecciona alguna de las áreas</p>}
          </div>
          <div>
            <label
              htmlFor="esp"
              className="block mb-2 text-sm font-medium text-white"
            >
              Especialidad:
            </label>
            <select
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.especialidad && 'border-red-500'}`}
              id="esp" {...register("especialidad", { required: true })} >
              <option selected disabled>Elije una especialidad: </option>
              {espState && espState.map(esp => (
                <option key={esp.id} defaultValue={esp.id}>{esp.name}</option>
              ))}
            </select>
            {errors.especialidad && <p className="text-red-500 text-xs italic">Selecciona alguna de las especialidades</p>}
          </div>
          <div>
            <label htmlFor="desde" className="block mb-2 text-sm font-medium text-white">Desde: </label>
            <input
              min={hoyString.split(re)[0]}
              type="datetime-local"
              id="desde"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.desde && 'border-red-500'}`}
              placeholder={hoy}
              {...register("desde", { required: true })}
            />
            {errors.desde && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
          </div>
          <div>
            <label
              htmlFor="hasta"
              className="block mb-2 text-sm font-medium text-white">Hasta: </label>
            <input type="datetime-local" id="hasta" min={watch('desde')}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.hasta && 'border-red-500'}`}
              placeholder={hoy}
              {...register("hasta", { required: true })}
            />
            {errors.hasta && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
          </div>
          <div>
            <label
              htmlFor="publicacion"
              className="block mb-2 text-sm font-medium text-white">Fecha de publicación: </label>
            <input
              type="date"
              id="publicacion"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.publicacion && 'border-red-500'}`}
              placeholder={`${hoyString}`}
              {...register("publicacion", { required: true })}
            />
            {errors.userName && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
          </div>
          <div>
            <label
              htmlFor="lugar"
              className="block mb-2 text-sm font-medium text-white">Lugar/Cede: </label>
            <input
              type="text"
              id="lugar"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.lugar && 'border-red-500'}`}
              placeholder="Centro Cultural Jaime Torres Bodet"
              {...register("lugar", { required: true, maxLength: 100 })}
            />
            {errors.lugar && <p className="text-red-500 text-xs italic">El lugar es requerido</p>}
            {errors.lugar?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El lugar es muy largo, debe ser menor a 100 caracteres</p>}
          </div>
          <div>
            <label
              htmlFor="organizador"
              className="block mb-2 text-sm font-medium text-white">Organizador/Encargado: </label>
            <input
              type="text"
              id="organizador"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.organizador && 'border-red-500'}`}
              placeholder="Introduce tu nombre o el de empresa"
              {...register("organizador", { required: true, maxLength: 60, pattern: /^[a-zA-Z\u00C0-\u017f\s]+?[0-9]{0,4}$/ })} />
            {errors.organizador && <p className="text-red-500 text-xs italic">El organizador/encargado no es válido</p>}
            {errors.organizador?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El organizador/encargado es muy largo, debe ser menor a 60 caracteres</p>}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-white">URL/Medio original: </label>
            <input
              type="url"
              id="url"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.url && 'border-red-500'}`}
              placeholder="https://www.cecyt9.ipn.mx/"
              {...register("url", { required: true, maxLength: 100, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ })} />
            {errors.url && <p className="text-red-500 text-xs italic">El URL no es válido</p>}
            {errors.url?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El URL es muy largo, debe ser menor a 100 caracteres</p>}
          </div>

        </div>
        <div className="grid gap-4 mb-2 md:grid-cols-2 col-span-2">
          {!loading && (
            <button
              type="submit"
              className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Agregar</button>
          )}
          {loading && (
            <Spinners />
          )}
          <button
            id="reset"
            type="reset"
            className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Borrar</button>
        </div>
      </form>
    </div>
  );
}
