import { useRouter } from "next/router"
import useUser from "../../lib/user"
import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import withSessionCecyt from "../../lib/cecyt";
import {NotificationContainer} from "react-notifications";
import axios from "axios";
import {useEffect, useState} from "react";
import Cards from "../../components/Cards";
import Spinners from "../../components/Spinners";

const Likes = ({ cecyt }) => {
    const router = useRouter()
    const { desc } = router.query
    const [user, message] = useUser()
    const { carrear, name } = cecyt
    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [posts, setPosts] = useState()

    const fetchLikesPosts = async () => {
        const  response  = await axios.get(`/api/getUserLikes/${user}`)
            .then(response => {
                setPosts(response.data.result)
                setLoaded(true)
            })
            .catch(error => setError(true))
    }

    useEffect(() => {
        user && !posts && fetchLikesPosts()
    }, [posts, user])

    return (
        <>
            <Layout title={"Mis Likes"} />
            <NavBar carrear={carrear} />
            <NotificationContainer />
            <div className="py-5 px-10">
                <h1 className="text-2xl font-bold text-center text-white pt-24">Mis Likes</h1>
                <div className="grid gird-cols-1 items-center justify-items-center gap-6 snap-y snap-proximity pt-8">
                    {!loaded && !error && <Spinners />}
                    {loaded && !error && posts && posts.map((post, index) => {
                        return <Cards img={post.pub_media} name={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} hour2={post.pub_horafinal} place={post.pub_locacion} key={post.pub_id} id={post.pub_id} link={post.pub_fuente} who={post.pub_encargado} cecyt={name} index={index} />
                    })}
                </div>
                {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                    <span className="font-medium">Lo sentimos😿!!</span> Por el momento no cuentas con likes.
                </div>}
            </div>
        </>
    )
}

export default Likes

export const getServerSideProps = withSessionCecyt(async function ({ req, res }) {
    const cecyt = req.session.get("cecyt")

    if (cecyt === undefined) {
        res.setHeader("location", "/principal")
        res.statusCode = 302
        res.end()
        return { props: {} }
    }

    return {
        props: { cecyt: cecyt }
    }

})