import Layout from "../components/Layout"
import { useState } from "react"
import axios from "axios"
import withSession from "../lib/session";
import Router from "next/router";
import Link from "next/link";
import Spinners from "../components/Spinners"
import Loggin from "../components/Login";
import { NotificationContainer } from "react-notifications";

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
                //console.log(err);
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
            <NotificationContainer />
            <Loggin />
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