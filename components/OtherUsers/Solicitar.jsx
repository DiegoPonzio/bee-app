import { BsPlusSquareDotted } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cecyts } from "../../clientServices/Cecyts";
import axios from "axios";
import Upload from "../Admin/Upload";
import { useFile } from "../../clientServices/hamburger"
import Spinners from "../Spinners";
import {NotificationManager} from "react-notifications";

export default function Solicitar({ usuario }) {

  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [espState, setEspState] = useState()
  const [file, setFile] = useState()

  const { register, formState: { errors }, handleSubmit, watch } = useForm();

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
    const { nombre, area, descripcion, especialidad } = e;
    setLoading(true)
    if (files.length === 0) {
      NotificationManager.error('Debe cargar al menos una imagen', '¡Error!', 3000);
      setLoading(false)
      return
    }

    try {
      const {data} = await axios.post('/api/PostFile', files)

      const { fileName } = data

      const res = await axios.post('/api/savePropost', {
        nombre,
        area,
        especialidad,
        descripcion,
        file: fileName,
        usuario
      }).then(veryfy)
        .catch(Errors)

    } catch (error) {
      setLoading(false)
      NotificationManager.error('No se ha podido guardar el archivo', '¡Error!', 3000);
    }
  }

  const veryfy = state => {
    setLoading(false)
    NotificationManager.success('Solicitud enviada correctamente', 'Éxito', 3000);
  }
  const Errors = state => {
    console.log(state)
    state.message ===  "timeout of 5000ms exceeded" && NotificationManager.error('Error al cargar la imagen', 'Error', 3000);
    state.response.data.result.message === "Data too long for column 'temp_titulo' at row 1" && NotificationManager.error('El nombre del evento es muy largo', 'Error', 3000);
    state.response.data.result.message === "Data too long for column 'temp_descripcion' at row 1" && NotificationManager.error('La descripción del evento es muy larga', 'Error', 3000);
  }

  return (
    <div className="items-center bg-gray-20 p-10 mb-3 rounded-md">
      <div>
        <div className="mb-6 cursor-pointer text-yellow-10">
          <BsPlusSquareDotted className="float-left mr-4" size={30} />{" "}
          <h2 className="text-3xl ml-4 ">Solicitud de Eventos/Actividades</h2>
        </div>
        <div>
          <form className="grid gird-cols-1 lg:grid-cols-2 gap-10" onSubmit={handleSubmit(actioHandler)} >
            <div className="grid gap-6 mb-2 lg:mb-8">
              <div>
                <label
                  htmlFor="nombre"
                  className="block mb-2 text-sm font-medium text-white">
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
              <div>
                <useFile.Provider value={{ files, setFiles, images, setImages }}>
                    <Upload />
                </useFile.Provider>
              </div>
            </div>
            <div>
              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <div className="mb-3 md:col-span-2">
                  <label
                    htmlFor="descripcion"
                    className="text-white block mb-2 text-sm font-medium">
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
                    htmlFor="area"
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
                    htmlFor="especialidad"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Especialidad:
                  </label>
                  <select
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.especialidad && 'border-red-500'}`}
                    id="especialidad" {...register("especialidad", { required: true })} >
                    <option selected disabled>Elije una especialidad</option>
                    {espState && espState.map(esp => (
                      <option key={esp.id} defaultValue={esp.id}>{esp.name}</option>
                    ))}

                  </select>
                  {errors.especialidad && <p className="text-red-500 text-xs italic">Selecciona alguna de las especialidades</p>}
                </div>
              </div>
              <div className="grid gap-4 mb-2 md:grid-cols-2 col-span-2">
                {!loading && (
                    <button
                        type="submit"
                        className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Enviar Solicitud</button>
                )}
                {loading && (
                    <Spinners />
                )}
                <button
                    id="reset"
                    type="reset"
                    className="text-black bg-yellow-200 hover:bg-yellow-100 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center">Borrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
