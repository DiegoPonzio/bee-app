//import NavAdmin from "../../components/admin/NavAdmin"
import Layout from "../../components/Layout"
import NavBar from "../../components/NavBar"
import Seleccionar from "../../components/OtherUsers/Seleccionar"
import {NotificationContainer} from "react-notifications";
//import withSessionCecyt from "../../lib/cecyt"

export default function Cecyts() {

    return (
        <>
            <Layout title="CECyTs" />
            <NavBar />
            <NotificationContainer />
            <Seleccionar />
        </>
    )
}

/*export const getServerSideProps = withSessionCecyt(async function ({ req, res }) {
    const user = req.session.get("cecyt")

    if (user !== undefined) {
        res.setHeader("location", "/")
        res.statusCode = 302
        res.end()
        return { props: {} }
    }

    return {
        props: { }
    }

})*/