import Layout from "../../components/Layout";
import withSession from "../../lib/session";
import NavAdmin from "../../components/Admin/NavAdmin";
import Solicitar from "../../components/OtherUsers/Solicitar";
import ShowPost from "../../components/OtherUsers/ShowPost";
import Solicitud from "../../components/Admin/Solicitud";
import { useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications"
import Modal from "../../components/Admin/Modal";
import { useAdminItem, useEditPost } from "../../clientServices/hamburger"
import SolicitudList from "../../components/Admin/SolicitudesList";
import PostsList from "../../components/Admin/PostsList";

// empresa, egresado y admin
export default function Home({ user }) {

    const [posts, setPosts] = useState()
    const [error, setError] = useState(false)
    const [selectedItem, setSelectedItem] = useState(1)
    const { usu_nombre, usu_id, priv_id } = user
    const URL = `https://bee-app.herokuapp.com/api/showAll`

    const fetchAll = async () => {
        const response = await fetch(URL)
            .then(response => response.json())
            .then(responseJSON => setPosts(responseJSON.result))
            .catch(() => setError(true))
    }

    useEffect(() => {
        !posts && fetchAll()
    }, [posts])

    return (
        <>
            {/* parte del admin */}
            <Layout title={`Welcome!! ${usu_nombre}`} />
            {priv_id === 1 && (
                <NavAdmin>
                    <NotificationContainer />
                    <div className="flex h-full w-full pt-16">
                        <useAdminItem.Provider value={{ selectedItem, setSelectedItem }}>
                            <div className="max-sm:hidden w-80">
                                <Modal userName={usu_nombre} />
                            </div>
                        </useAdminItem.Provider>
                        <div className="w-full p-3 text-white grid place-items-center">
                            {selectedItem === 1 && <div>parte del dashboard</div>}
                            {selectedItem === 2 && <div className=" md:ml-12 mb-1"><SolicitudList /></div>}
                            {selectedItem === 3 && <Solicitud user={usu_id} />}
                            {selectedItem === 4 && (
                                <div className="md:ml-12 mb-1">
                                    <PostsList user={usu_id} />
                                </div>
                            )}

                        </div>
                    </div>
                </NavAdmin>
            )}
            {priv_id !== 1 && (
                <>
                    <NavAdmin />
                    <div className="py-10 px-10">
                        <Solicitar usuario={usu_id} />
                    </div>
                    <footer className="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
                        <ShowPost user={usu_id} userName={usu_nombre}></ShowPost>
                    </footer>
                </>
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