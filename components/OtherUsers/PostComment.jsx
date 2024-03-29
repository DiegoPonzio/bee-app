import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from 'react-notifications'
import { useComment } from "../../clientServices/hamburger";
import Spinners from "../Spinners";
import banish  from "to-zalgo/banish";

export default function PostComment({ id, user }) {
    const ctx = useContext(useComment)
    const { setPosts } = ctx
    const [loader, setLoader] = useState(false)

    const banishZalgo = zalgo => banish(zalgo)

    const { register, formState: { errors }, handleSubmit, watch } = useForm();
    //const [text, setText] = useState("")

    const actionHandler = async e => {
        const { comentario } = e
        const comZalgo = banishZalgo(comentario)
        setLoader(true)
        //document.querySelector("#chat").value = ""
        if (!user) {
            NotificationManager.error('No has iniciado sesión', '¡Error!', 5000)
            setLoader(false)
        } else {
            const res = await axios.post("/api/saveComment", {
                name: user,
                comentario: comZalgo,
                id
            })
                .then(() => {
                    NotificationManager.success('Se ha guardado el comentario', '¡Éxito!', 5000)
                    setPosts(false)
                    setLoader(false)
                })
                .catch(() => {
                    NotificationManager.error('Ocurrió un problema al guardar el comentario', '¡Error!', 5000)
                    setLoader(false)
                })
        }
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit(actionHandler)}>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex-col items-center px-3 py-2 rounded-lg">
                    <div className="flex">
                        <textarea id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-white bg-gray-500 rounded-lg border max-h-32 focus:ring-yellow-10 border-gray-500" placeholder="Your message..."
                                  {...register("comentario", { required: true, maxLength: 200 })}
                        ></textarea>
                        {loader ? <Spinners /> : (
                            <button type="submit" className="inline-flex justify-center p-2 text-yellow-10 rounded-full cursor-pointer hover:bg-yellow-10 hover:text-gray-700">
                                <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        )}
                    </div>
                    {errors.comentario && <p className="text-red-500 pl-4 text-xs italic">El comentario no es válido</p>}

                </div>
            </form>
        </div>
    )
}