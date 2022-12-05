import { useEffect, useState } from "react"
import CardAdmin from "../../../components/Admin/CardAdmin"
import NavAdmin from "../../../components/Admin/NavAdmin"
import Solicitud from "../../../components/Admin/Solicitud"
import Banner404 from "../../../components/Banners/Banner"
import Footer from "../../../components/Footer"
import Layout from "../../../components/Layout"
import withSession from "../../../lib/session"
import { NotificationContainer } from "react-notifications"

export default function SolicitudAdmin({ user }) {
    const { usu_nombre, usu_id, priv_id } = user
    const [error, setError] = useState(false)
    const [post, setPost] = useState()

    const URL = 'https://bee-pruebas.herokuapp.com/api/showAll/byUser'

    const fetchUsers = async () => {
        const response = await fetch(URL)
            .then(response => response.json())
            .then(responseJSON => {
                setPost(responseJSON.result)
                setError(false)
            })
            .catch(() => setError(true))
    }

    useEffect(() => {
        !post && fetchUsers()
    })

    return (
        <>
            <Layout title={`Welcome!! ${usu_nombre}`} />
            {priv_id === 1 && (
                <>  
                    <NavAdmin type={priv_id} />
                    <NotificationContainer />
                    <div className="py-10 px-10">
                        <Solicitud user={usu_id} />

                        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
                            {!error && post && post.map( post => (
                                <CardAdmin status={true} id={post.temp_id} key={post.temp_id} title={post.temp_titulo} body={post.temp_descripcion} place={post.temp_esp}  />
                            ))}
                        </div>
                        <Footer />
                    </div>
                    {!error && post && (
                        <>
                            <br />
                            <br />
                            <br />
                        </>
                    )}
                </>
            )}
            {priv_id !== 1 && (
                <div className="place-content-center bg-amber-200 min-h-screen flex items-center justify-center">
                    <Banner404 />
                </div>
            )}
        </>
    )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user")

    if (user === undefined) {
        res.setHeader("location", "/login")
        res.statusCode = 302
        res.end()
        return { props: {} }
    }

    return {
        props: { user: req.session.get("user") }
    }

})