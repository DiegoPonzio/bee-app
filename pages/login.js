import Layout from "../components/Layout"
import { useState } from "react"
import axios from "axios"
import withSession from "../lib/session";
import Router from "next/router";
import Link from "next/link";
import Spinners from "../components/Spinners"

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState()
    const [state, setState] = useState(false)
    const [state2, setState2] = useState(false)
    const [stateP, setStateP] = useState(false)
    const [hideButton, setHideButton] = useState(false)

    const actioHandler = async e => {
        e.preventDefault()
        setHideButton(true)
        const res = await axios.post('/api/auth', {
            username,
            password
        }).then(Veryfy)
            .catch((err) => {
                setState2(true)
            })
    }

    const Veryfy = async (status) => {
        setStatus(status)
        try {
            if (await status !== null) {
                const data = await status.data
                if (data !== undefined) {
                    const { data } = status
                    if (data.status === 401) {
                        setState(true)
                        setState2(false)
                        setHideButton(false)
                    } else if (data.status === 200) {
                        Router.replace("/user/home")
                    } else if (data.status === 408) {
                        setState2(true)
                        setState(false)
                        setHideButton(false)
                    }
                }
            }
        } catch (err) {
            //console.log(err);
            setState2(true)
            setState(false)
        }
    }

    return (
        <>
            <Layout title='Login' />
            <div className="place-content-center bg-amber-200 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={actioHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Usuario
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onInput={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${!stateP && "border-red-500"}`} id="password" type="password" placeholder="******************" onInput={e => { setPassword(e.target.value); setStateP(true) }} />
                            <p className={stateP ? "hidden" : "text-red-500 text-xs italic"}>Please choose a password.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            {!hideButton && <button className="bg-amber-200  hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                Sign In
                            </button>}
                            {hideButton && <Spinners />}
                            <a href={"/"} className="inline-block align-baseline  font-bold text-sm text-gray-400 hover:text-amber-300">
                                Regresar </a>
                        </div>
                        <br></br>
                        <div className={`${state ? "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" : "hidden"}`} role="alert">
                            <span className="font-medium">Error!!</span> Usaurio y/o constraseña incorrectos
                        </div>
                        <div className={`${state2 ? "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" : "hidden"}`} role="alert">
                            <span className="font-medium">Error!!</span> Ocurrio un problema
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2022 BEE Assistant
                    </p>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user")

    if (user !== undefined) {
        res.setHeader("location", "/user/home")
        res.statusCode = 302
        res.end()
        return { props: {} }
    }

    return {
        props: {}
    }

})