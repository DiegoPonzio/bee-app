import { useForm } from "react-hook-form";

export default function PostComment() {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    return (
        <div className="">

            <form>
                <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Escribe tu nombre: </label>
                    <input type="text" className={`block p-2.5 w-full text-sm text-gray-900 bg-amber-50 hover:bg-yellow-200 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:bg-yellow-300 focus:border-amber-500 ${errors.nombre && 'border-red-500'} `} placeholder="Bee Assistant" {...register("nombre", { required: true, minLength: 2, maxLength: 60, pattern: /^[a-zA-Z\u00C0-\u017f\s]+?[0-9]{0,8}$/ })} />
                    {errors.nombre && <p className="text-red-500 text-xs italic">El nombre no es válido</p>}
                    {errors.nombre?.type === 'minLength' && <p className="text-red-500 text-xs italic">El nombre es muy corto, debe ser mayor a 2 caracteres</p>}
                    {errors.nombre?.type === 'maxLength' && <p className="text-red-500 text-xs italic">El nombre es muy largo, debe ser menor a 60 caracteres</p>}
                </div>
                <br/>
                <div>
                    <label forHTML="message" className="block mb-2 text-sm font-medium text-gray-900">Escribe tu mensaje: </label>
                    <textarea id="message" rows="4" className={`block p-2.5 w-full text-sm text-gray-900 bg-amber-50 hover:bg-yellow-200 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:bg-yellow-300 focus:border-amber-500 ${errors.comentario && 'border-red-500'} `} placeholder="Escribe tus comentarios aquí..." {...register("comentario", { required: true, minLength: 2, pattern: /^[a-zA-Z\u00C0-\u017f\s]+?[0-9]{0,8}$/ })} ></textarea>
                    {errors.comentario && <p className="text-red-500 text-xs italic">El comentario no es válido</p>}
                    {errors.nombre?.type === 'minLength' && <p className="text-red-500 text-xs italic">El comentario es muy corto, debe ser mayor a 2 caracteres</p>}
                </div>

                <br/>
                
                <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-yellow-200 hover:bg-yellow-300 rounded-lg hover:bg-yellow-300 focus:border-amber-500 ">
                    Publicar Comentario
                </button>

            </form>

        </div>
    )
}