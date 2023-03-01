import axios from "axios";
import { useForm } from "react-hook-form";
import { NotificationManager } from 'react-notifications'

export default function PostComment({ id, user}) {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const actionHandler = async e => {
        const { comentario } = e

        if(!user) {
            NotificationManager.error('No has iniciado sesión', 'Error!!', 5000)
        }
        
        /*const res = await axios.post("/api/saveComment", {
            comentario,
            id
        })
            .then(() => NotificationManager.success('Se ha guardado el comentario', 'Exito!!', 5000))
            .catch(() => NotificationManager.error('Ocurrió un problema al guardar el comentario :(', 'Error!!', 5000))*/
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit(actionHandler)}>
                <label for="chat" class="sr-only">Your message</label>
                <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50">
                    <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your message..."
                    {...register("comentario", { required: true })}
                    ></textarea>
                    <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100">
                        <svg aria-hidden="true" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        <span class="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    )
}