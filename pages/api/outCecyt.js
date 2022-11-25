import withSessionCecyt from "../../lib/cecyt";

export default withSessionCecyt(async (req, res) => {
    req.session.destroy();
    //res.redirect('/principal')
})