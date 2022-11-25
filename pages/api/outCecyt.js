import withSessionCecyt from "../../lib/cecyt";

export default withSessionCecyt(async (req, res) => {
    switch (req.method) {
        case "GET":
            req.session.destroy();
            res.redirect('/')

        default:
            return res.status(400).json({ message: "Bad request", status: 400 })
    }
})