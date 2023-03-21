import { newComment } from "../../lib/postProcedures"
import withSession from "../../lib/session"


export default withSession(async (req, res) => {

    if (req.method !== "POST") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }
    
    const user = req.session.get("user")

    if (!user) {
        res.status(401).send(`Invalid user: ${user}`);
        return;
    }

    try {
        const { name, comentario, id } = req.body

        if (user.usu_nombre !== name) {
            res.status(403).send(`Invalid user: ${user}`);
        }

        const comment = await newComment(name, comentario, id)
        
        return res.status(200).json({ message: "Exito", result: comment, status: 200 })
    } catch (error) {
        return res.status(408).json({ message: 'Error', result: err, status: 408 })
    }
})