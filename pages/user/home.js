import Layout from "../../components/Layout";
import withSession from "../../lib/session";
import NavAdmin from "../../components/Admin/NavAdmin";
import Solicitar from "../../components/OtherUsers/Solicitar";
import Solicitud from "../../components/Admin/Solicitud";
import { useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications"
import Modal from "../../components/Admin/Modal";
import { useAdminItem, useEditPost } from "../../clientServices/hamburger"
import SolicitudList from "../../components/Admin/SolicitudesList";
import PostsList from "../../components/Admin/PostsList";
import AdminPerPost from "../../components/Charts/AdminPerPost";
import Acount from "../../components/OtherUsers/Acount";
import LikesPerPost from "../../components/Charts/LikesPerPost";
import ComentsPerPost from "../../components/Charts/ComentsPerPost";
import PostPerEsp from "../../components/Charts/PostPerEsp";

// empresa, egresado y admin
export default function Home({ user }) {
    const { usu_nombre, usu_id, priv_id } = user
    const [posts, setPosts] = useState()
    const [error, setError] = useState(false)
    const [selectedItem, setSelectedItem] = useState(priv_id === 1  ? 1 : 4 )
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
                                <Modal userName={usu_nombre} userType={usu_id} />
                            </div>
                        </useAdminItem.Provider>
                        <div className="w-full p-3 text-white grid place-items-center">
                            {selectedItem === 1 && <div className={"flex flex-wrap gap-4 md:ml-12"}>
                                <AdminPerPost />
                                <LikesPerPost />
                                <ComentsPerPost />
                                <PostPerEsp />
                            </div>}
                            {selectedItem === 2 && <div className=" md:ml-12 mb-1"><SolicitudList /></div>}
                            {selectedItem === 3 && <Solicitud user={usu_id} />}
                            {selectedItem === 4 && (
                                <div className="md:ml-12 mb-1">
                                    <PostsList user={usu_id} />
                                </div>
                            )}
                            {selectedItem === 5 && <div className="md:ml-12 mb-1 w-4/5">
                                <Acount user={user} />
                            </div>}
                        </div>
                    </div>
                </NavAdmin>
            )}
            {priv_id === 2 || priv_id === 3 && (
                <NavAdmin>
                    <NotificationContainer />
                    {/*<div className="py-10 px-10 pt-20">
                        <Solicitar usuario={usu_id} />
                        <Acount user={user} />
                    </div>*/}
                    <div className="flex h-full w-full pt-16">
                        <useAdminItem.Provider value={{ selectedItem, setSelectedItem }}>
                            <div className="max-sm:hidden w-80">
                                <Modal userName={usu_nombre} userType={priv_id} />
                            </div>
                        </useAdminItem.Provider>
                        <div className="w-full p-3 text-white grid place-items-center">
                            {selectedItem === 3 && <Solicitar usuario={usu_id} />}
                            {selectedItem === 4 && (
                                <div className="md:ml-12 mb-1">
                                    Mis solicitudes :(
                                </div>
                            )}
                            {selectedItem === 5 && <div className="md:ml-12 mb-1 w-4/5">
                                <Acount user={user} />
                            </div>}
                        </div>
                    </div>
                </NavAdmin>
            )}
            {priv_id === 4 && (
                <NavAdmin>
                    <NotificationContainer />
                    <div className="py-10 px-10 pt-20 text-white">
                        <Acount user={user} />
                    </div>
                </NavAdmin>
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
        props: { user: req.session.get("user")}
    }
})