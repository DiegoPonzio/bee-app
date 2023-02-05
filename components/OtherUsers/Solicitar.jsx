import { BsPlusSquareDotted } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cecyts } from "../../clientServices/Cecyts";
import axios from "axios";

export default function Solicitar({ usuario }) {

  axios.defaults.timeout = 5000
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorTitle, setErrorTitle] = useState(false)
  const [errorDesc, setErrorDesc] = useState(false)
  const [saveCorrect, setSaveCorrect] = useState(false)
  const [espState, setEspState] = useState()
  const [file, setFile] = useState()
  const [stateFile, setStateFile] = useState(false)
  const [fileName, setFileName] = useState("")
  const re = /:[0-9]{2}.[0-9]{3}Z/

  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const tt = Date.now();
  const hoy = new Date(tt);
  const hoyString = hoy.toISOString().toString();

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

  const especialidadesFetch = value => {
    switch (value) {
      case "Escolar":
        const { escolar } = cecyts[9 - 1].area
        setEspState(escolar);
        break
      case "Extracurricular":
        const { extracurricular } = cecyts[9 - 1].area
        setEspState(extracurricular);
        break
      case "De Carrera":
        const { DeCarrera } = cecyts[9 - 1].area
        setEspState(DeCarrera);
        break
    }
  }

  const actioHandler = async e => {
    //console.log(e);
    setErrorDesc(false)
    setErrorStatus(false)
    setErrorTitle(false)
    setSaveCorrect(false)
    const { nombre, area, descripcion, especialidad } = e
    const result = await axios.post('/api/savePropost', {
      nombre,
      area,
      especialidad,
      descripcion,
      file,
      usuario
    }).then(veryfy)
      .catch(Errors)
    //timeout of 5000ms exceeded 
    //problema interno al cargar la imagen
  }

  const veryfy = state => {
    setSaveCorrect(true)
  }

  const Errors = state => {
    state.message ===  "timeout of 5000ms exceeded" && setErrorStatus(true)
    state.response.data.result.message === "Data too long for column 'temp_titulo' at row 1" && setErrorTitle(true)
    state.response.data.result.message === "Data too long for column 'temp_descripcion' at row 1" && setErrorDesc(true)
  }

  return (
    <div className="items-center bg-amber-300 p-10 mb-3 rounded-md ">
      <div>
        <div className="mb-6 cursor-pointer">
          <BsPlusSquareDotted className="float-left mr-4" size={30} />{" "}
          <h2 className="text-3xl ml-4 ">Solicitud de Eventos/Actividades</h2>
        </div>
        <div>
          <form className="grid gird-cols-1 lg:grid-cols-2 gap-10" onSubmit={handleSubmit(actioHandler)} >
            <div className="grid gap-6 mb-2 lg:mb-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Nombre del Evento/Actividad:
                </label>
                <input
                  type="text"
                  id="nombre"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.nombre && 'border-red-500'}`}
                  placeholder="Evento/Actividad"
                  {...register("nombre", { required: true, maxLength: 50, pattern: /^[a-zA-Z\u00C0-\u017f\s]+$/ })}
                />
                {errors.nombre && <p className="text-red-500 text-xs italic">El nombre del evento no es válido</p>}
                {errors.nombre?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El nombre del evento es muy largo, debe ser menor a 50 caracteres</p>}
              </div>
              <div className={"flex justify-center items-center w-full"}>
                {!stateFile && (
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
                    {!stateFile && <br />}
                    {!stateFile && <p className="text-red-500 text-xs italic">Selecciona algún archivo en el formato y tamaño solicitado</p>}
                  </label>)}
                {stateFile && (
                  <div className={`p-4 mb-4 text-sm text-lime-600 bg-lime-200 rounded-lg col-span-2 text-cente`} role="alert">
                    <span className="font-medium">Exito!!</span> Se ha subido correctamente el archivo {fileName} <a href="#" onClick={() => setStateFile(false)} className="hover:text-lime-700">Elegir uno nuevo</a>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <div className="mb-3 md:col-span-2">
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
                    {...register("descripcion", { required: true, maxLength: 300 })}
                  ></textarea>
                  {errors.descripcion && <p className="text-red-500 text-xs italic">La descripción de la actividad es requerida</p>}
                  {errors.descripcion?.type === 'maxLength' && <p className="text-red-500 text-xs italic">La descripción del evento es muy larga, debe ser menor a 300 caracteres</p>}
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900">Área:</label>
                  <select className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.area && 'border-red-500'}`}
                    id="area" {...register("area", { required: true })}
                    onChange={e => especialidadesFetch(e.target.value)}>
                    <option selected disabled>Elija un área</option>
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
              </div>
              <div className="grid gap-6 mb-8 md:grid-cols-2 justify">
                <button
                  type="submit"
                  className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Enviar Solicitud</button>
                <button
                  id="reset"
                  type="reset"
                  className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Borrar</button>
                {saveCorrect && (
                  <div className="p-4 mb-4 text-sm text-lime-600 bg-lime-200 rounded-lg col-span-2 text-center" role="alert">
                    <span className="font-medium">Exito!!</span> Se ha guardado correctamente el comunicado
                  </div>
                )}
                {errorTitle && (
                  <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
                    <span className="font-medium">Error!!</span> El título es demasiado grande, un minimo de 50 caracteres
                  </div>
                )}
                {errorDesc && (
                  <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
                    <span className="font-medium">Error!!</span> La descripción es demasiado grande un minimo de 300 caracteres
                  </div>
                )}
                {errorStatus && (
                  <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
                    <span className="font-medium">Error!!</span> El archivo es demasiado grande
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
