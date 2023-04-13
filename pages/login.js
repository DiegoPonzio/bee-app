import Layout from "../components/Layout"
import withSession from "../lib/session";
import Loggin from "../components/Login";
import { NotificationContainer } from "react-notifications";

export default function Login() {

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