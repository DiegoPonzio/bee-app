import withSessionCecyt from "../../lib/cecyt";

export default withSessionCecyt((req, res) => {
    switch (req.method) {
        case "GET":
            try {
                req.session.destroy();
                return res.status(200).json({
                    response: "OK"
                })
            } catch (error) {
                return res.status(400).json({
                    reponse: "Error"
                })
            }

        default:
            return res.status(400).json({ message: "Bad request" })
    }
})