import withSession from "../../lib/session";

export default withSession(async (req, res) => {
    req.session.destroy();
    res.setHeader("location", "/")
    res.statusCode = 302
    res.end()
})