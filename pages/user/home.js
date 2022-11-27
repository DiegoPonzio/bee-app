import Layout from "../../components/Layout";
import withSession from "../../lib/session";
import CardAdmin from "../../components/Admin/CardAdmin";
import Footer from '../../components/Footer';
import NavAdmin from "../../components/Admin/NavAdmin";
import Solicitar from "../../components/OtherUsers/Solicitar";
import ShowPost from "../../components/OtherUsers/ShowPost";
import Solicitud from "../../components/Admin/Solicitud";
import { useEffect, useState } from "react";
import Spinners from "../../components/Spinners";
import { NotificationContainer } from "react-notifications"

// empresa, egresado y admin
export default function Home({ user }) {

    const [posts, setPosts] = useState()
    const [error, setError] = useState(false)
    const { usu_nombre, usu_id, priv_id } = user
    const URL = `https://bee-pruebas.herokuapp.com/api/showAll`

    const fetchAll = async () => {
        const response = await fetch(URL)
            .then(response => response.json())
            .then(responseJSON => setPosts(responseJSON.result))
            .catch(() => setError(true))
    }

    useEffect(() => {
        fetchAll()
    })

    return (
        <>
            {/* parte del admin */}
            <Layout title={`Welcome!! ${usu_nombre}`} />
            {priv_id === 1 && (
                <>
                    <NavAdmin type={priv_id} />
                    <NotificationContainer />
                    <div className="py-10 px-10">
                        <Solicitud user={usu_id} />
                        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
                            {!posts && !error && <Spinners />}
                            {!error && posts && posts.map(post => {
                                //console.log(bufferToBinaryString(post.pub_media.data))
                                return <CardAdmin img={String.fromCharCode(...post.pub_media.data)} title={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} place={post.pub_locacion} key={post.pub_id} id={post.pub_id} />
                            })}
                        </div>
                        {!error && posts && (
                            <>
                                <br />
                                <br />
                                <br />
                            </>
                        )}
                        <Footer />
                    </div>
                </>
            )}
            {priv_id !== 1 && (
                <>
                    <NavAdmin type={priv_id} />
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