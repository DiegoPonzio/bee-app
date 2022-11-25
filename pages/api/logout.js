import withSession from "../../lib/session";

export default withSession((req, res) => {
    req.session.destroy();
    res.redirect(308,'https://bee-pruebas.herokuapp.com/')
})