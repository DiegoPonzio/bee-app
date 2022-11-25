import withSession from "../../lib/session";
import Router from "next/router"

export default withSession(async (req, res) => {
    req.session.destroy();
    Router.replace("/")
})