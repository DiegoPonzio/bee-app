import axios from "axios";
import { useState } from "react";
import { BsPlusSquareDotted } from "react-icons/bs";
import { cecyts } from "../../clientServices/Cecyts";
import { useForm } from "react-hook-form";
import Spinners from "../Spinners"

export default function Solicitud({ user }) {

  const [state, setState] = useState(false)
  const [state2, setState2] = useState(false)
  const [open, setOpen] = useState(false)
  const [espState, setEspState] = useState("")
  const [file, setFile] = useState()
  const [stateFile, setStateFile] = useState(false)
  const [fileName, setFileName] = useState("")
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorTitle, setErrorTitle] = useState(false)
  const [errorDesc, setErrorDesc] = useState(false)
  const [loading, setLoading] = useState(false)

  const tt = Date.now();
  const hoy = new Date(tt);
  const hoy2 = new Date(tt);
  const hoyString = hoy.toLocaleDateString().toString();

  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const escuela = watch("escuela")

  const handlerFile = e => {
    const files = e.target.files
    const file = files[0]
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = function (e) {
      const blob = e.target.result
      setFile(blob)
      setStateFile(true)
    }

    reader.readAsDataURL(file)
  }


  function especialidadesFetch(value) {
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
    setLoading(true)
    setErrorStatus(false)
    if (status.data.status === 200) {
      const reset = document.querySelector('#reset')
      reset.click()
      setState(true)
      setState2(false)
      setErrorDesc(false)
      setErrorStatus(false)
      setErrorTitle(false)
      setLoading(false)
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_media' at row 1") {
      setStateFile(false)
      setErrorStatus(true)
      setState(false)
      setErrorDesc(false)
      setState2(false)
      setLoading(false)
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_titulo' at row 1") {
      setStateFile(true)
      setErrorStatus(false)
      setErrorTitle(true)
      setErrorDesc(false)
      setState(false)
      setState2(false)
      setLoading(false)
    } else if (status.data.status === 408 && status.data.result.message === "Data too long for column 'pub_descripcion' at row 1") {
      setStateFile(true)
      setErrorStatus(false)
      setErrorTitle(false)
      setErrorDesc(true)
      setState(false)
      setState2(false)
      setLoading(false)
    }
  }

  const Error = res => {
    setLoading(true)
    const { message } = res
    if (message === "Request failed with status code 413") {
      setErrorStatus(true)
      setStateFile(false)
      setLoading(false)
    }
  }

  const actionHandler = async e => {
    //console.log(e);
    const { nombre, descripcion, escuela, especialidad, desde, hasta, publicacion, lugar, organizador, url } = e

    const res = await axios.post("/api/savePost", {
      nombre,
      file,
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
  }

  return (
    <div className="items-center bg-amber-300 p-10 mb-3 rounded-md ">
      <div>
        <div className="mb-6 cursor-pointer" onClick={() => setOpen(!open)}>
          <BsPlusSquareDotted className="float-left mr-4" size={30} />{" "}
          <h2 className="text-3xl ml-4 ">Agregar Comunicado</h2>
        </div>
        <div className={`${!open && "hidden"}`}>
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
                  {...register("nombre", { required: true, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })}
                />
                {errors.nombre && <p className="text-red-500 text-xs italic">El nombre del evento no es válido</p>}
              </div>
              {!stateFile && (
                <div className={"flex justify-center items-center w-full"}>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-black border-dashed cursor-pointer">
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Haga click para subir un archivo</span> o arrastre y suelte
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="archivo" type="file" className={`hidden`} {...register("archivo", { required: true, pattern: /(.svg|.png|.jpg|.gif)$/i })} onChange={handlerFile} />
                    <button onClick={() => {
                      const file = document.querySelector("#archivo")
                      file.click()
                    }}>Selecciona un Archivo</button>
                  </label>
                </div>)}
              {stateFile && <p className="text-green-500 text-xs italic">Se ha cargado adecuadamente el archivo {fileName} <a href="#" onClick={() => setStateFile(false)} className="hover:text-lime-700">Elejir uno nuevo</a></p>}
              {stateFile && <img src={file} alt="preview" />}
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
                  {...register("descripcion", { required: true })}
                ></textarea>
                {errors.descripcion && <p className="text-red-500 text-xs italic">La descripción de la actividad es requerida</p>}
              </div>
            </div>
            <div>
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="dirigido"
                    className="block mb-2 text-sm font-medium text-gray-900">
                    CECyT</label>
                  <select
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.escuela && 'border-red-500'}`}
                    id="escuela" {...register("escuela", { required: true })}>
                    <option selected disabled>Elije un CECyT</option>
                    {cecyts.map(cecyt => (
                      <option key={cecyt.name} defaultValue={cecyt.id}>{cecyt.name}</option>))}
                  </select>
                  {errors.escuela && <p className="text-red-500 text-xs italic">Selecciona alguna de las escuelas</p>}
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900">Area:</label>
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
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Especialidad:
                  </label>
                  <select
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.especialidad && 'border-red-500'}`}
                    id="last_name" {...register("especialidad", { required: true })} >
                    <option selected disabled>Elije una especialidad</option>
                    {espState && espState.map(esp => (
                      <option key={esp.id} defaultValue={esp.id}>{esp.name}</option>
                    ))}

                  </select>
                  {errors.especialidad && <p className="text-red-500 text-xs italic">Selecciona alguna de las especialidades</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">Desde: </label>
                  <input
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
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900">Hasta: </label>
                  <input type="datetime-local" id="hasta"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.hasta && 'border-red-500'}`}
                    placeholder={hoy}
                    {...register("hasta", { required: true })}
                  />
                  {errors.hasta && <p className="text-red-500 text-xs italic">Elige una fecha</p>}
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block mb-2 text-sm font-medium text-gray-900">Fecha de publicacin: </label>
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
                    htmlFor="visitors"
                    className="block mb-2 text-sm font-medium text-gray-900">Lugar o cede: </label>
                  <input
                    type="text"
                    id="lugar"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.lugar && 'border-red-500'}`}
                    placeholder="Centro Cultural Jaime Torres Bodet"
                    {...register("lugar", { required: true })}
                  />
                  {errors.lugar && <p className="text-red-500 text-xs italic">El lugar es requerido</p>}
                </div>
                <div>
                  <label
                    htmlFor="dirigido"
                    className="block mb-2 text-sm font-medium text-gray-900">Organizador: </label>
                  <input
                    type="text"
                    id="organizador"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.organizador && 'border-red-500'}`}
                    placeholder="Introduce tu nombre o el de empresa"
                    {...register("organizador", { required: true, pattern: /^[a-zA-Z\u00C0-\u017f\s]+?[0-9]{0,2}$/ })} />
                  {errors.organizador && <p className="text-red-500 text-xs italic">El organizador no es válido</p>}
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
                    {...register("url", { required: true, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ })} />
                  {errors.url && <p className="text-red-500 text-xs italic">El URL no es válido</p>}
                </div>
              </div>
              <div className="grid gap-6 mb-8 md:grid-cols-2 justify">
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
                <div className={`${state2 ? "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center" : "hidden"}`} role="alert">
                  <span className="font-medium">Error!!</span> Ocurrio un problema
                </div>
                <div className={`${state ? "p-4 mb-4 text-sm text-lime-600 bg-lime-200 rounded-lg col-span-2 text-center" : "hidden"}`} role="alert">
                  <span className="font-medium">Exito!!</span> Se ha guardado correctamente el comunicado
                </div>
                {errorStatus && (
                  <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
                    <span className="font-medium">Error!!</span> El archivo es demasiado grande
                  </div>
                )}
                {errorTitle && (
                  <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
                    <span className="font-medium">Error!!</span> El título es demasiado grande un minimo de 50 caracteres
                  </div>
                )}
                {errorDesc && (
                  <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
                    <span className="font-medium">Error!!</span> La descripción es demasiado grande un minimo de 300 caracteres
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
