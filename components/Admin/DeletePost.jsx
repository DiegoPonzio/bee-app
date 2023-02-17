import axios from "axios"
import { useContext, useState } from "react"
import { NotificationManager } from "react-notifications"
import { useEditPost } from "../../clientServices/hamburger"
import Spinners from "../Spinners"

 export default function({ id }){
    const ctx = useContext(useEditPost)
    const { setSelectedDelete, setPostsList } = ctx
    const [ loading, setLoading ] = useState(false)
    const onDelete = async () => {
        const res = axios.delete(`/api/deletePost/${id}`)
            .then( () =>  {
                NotificationManager.success('Se ha eliminado correctamente', 'Exito!!', 5000)
                setSelectedDelete("")
                setPostsList(false)
                setLoading(true)
            })
            .catch( () => NotificationManager.error( 'Ocurrió un problema al eliminar', 'Error!!', 5000) )
    }


    return(
        <div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full items-center justify-center flex">
            <div className="relative w-full h-full max-w-md md:h-auto">
                <div className="relative bg-[#3C3838] rounded-lg shadow">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="popup-modal" onClick={() => setSelectedDelete("")} disabled={loading}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">¿Estas seguro de eliminar el comunicado No.{id}?</h3>
                        {!loading && <button data-modal-toggle="popup-modal" type="button" className="text-white bg-[#FCE155] hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"  onClick={ () => onDelete() } >
                            Continuar
                        </button>}
                        {loading && <Spinners />}
                        <button data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={() => setSelectedDelete("")} disabled={loading}>No, cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }