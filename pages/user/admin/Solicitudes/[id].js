import { useRouter } from 'next/router'
import NavAdmin from '../../../../components/Admin/NavAdmin'
import Banner404 from '../../../../components/Banners/Banner'
import Footer from '../../../../components/Footer'
import Layout from '../../../../components/Layout'
import withSession from '../../../../lib/session'
import { errores } from '../../../../clientServices/errores'
import Cards from '../../../../components/Cards'
import { NotificationContainer } from 'react-notifications'
import SolisitudRes from '../../../../components/Admin/SolicitudRes'
import { useEffect, useState } from 'react'
import { stringify } from 'postcss'

const EditPropost = ({ user }) => {
    const { usu_nombre, usu_id, priv_id } = user
    const router = useRouter()
    const { id } = router.query
    const { status, nombre, descripcion } = errores[1]
    const [post, setPost] = useState(false)
    const [error404, setError404] = useState(false)
    const URL = `https://bee-pruebas.herokuapp.com/api/showAll/temp/byId/${id}`

    const fetchPost = async () => {
        const response = await fetch(URL)
          .then(response => response.json())
          .then(responseJson => setPost(responseJson.result[0]))
          .catch(() => setError404(true))
      }
    
      useEffect(() => {
        !post && fetchPost()
      }, [post])

    return (
        <>
            <Layout title={`Welcome!! ${usu_nombre}`} />
            {priv_id === 1 && (
                <>
                    <NavAdmin type={usu_id} />
                    <NotificationContainer />
                    <div className="py-10 px-10">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='place-content-center flex items-center'>
                                {post && (
                                    <Cards name={post.temp_titulo} body={post.temp_descripcion} place={post.temp_esp}/>
                                )}
                            </div>
                            <div>
                                <SolisitudRes id={id} />
                            </div>
                        </div>
                        {post && (
                            <>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </>
                        )}
                        <Footer />
                    </div>
                </>
            )}
            {priv_id !== 1 && (
                <div className="place-content-center bg-amber-200 min-h-screen flex items-center justify-center">
                    <Banner404 error={status} title={nombre} desc={descripcion} />
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

export default EditPropost