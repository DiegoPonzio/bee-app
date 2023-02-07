import { useRouter } from 'next/router'
import NavAdmin from '../../../../components/Admin/NavAdmin'
import Banner404 from '../../../../components/Banners/Banner.jsx'
import Footer from '../../../../components/Footer'
import Layout from '../../../../components/Layout'
import withSession from '../../../../lib/session'
import { errores } from '../../../../clientServices/errores'
import Editar from '../../../../components/Admin/Editar'
import { NotificationContainer } from 'react-notifications'

const Edit = ({ user }) => {
    const { usu_nombre, usu_id, priv_id } = user
    const router = useRouter()
    const { id } = router.query
    const { status, nombre, descripcion } = errores[1]

    return (
        <>
            <Layout title={`Welcome!! ${usu_nombre}`} />
            {priv_id === 1 && (
                <>
                    <NavAdmin type={usu_id} />
                    <NotificationContainer />
                    <div className="py-10 px-10">
                        <Editar id={id} user={usu_id} />
                        <br></br>
                        <br></br>
                        <br></br>
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

export default Edit