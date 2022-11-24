import Principal from "../components/otherUsers/Principal"
//import withSessionCecyt from "../lib/cecyt"

export default function Main () {

    return (
        <Principal/>
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