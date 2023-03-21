import { updatePost } from "../../lib/postProcedures"
import withSession from "../../lib/session"

export default withSession(async (req, res) => {

    if (req.method !== "PUT") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }

    const user = req.session.get("user")
    
    if (!user) {
        res.status(401).send(`Invalid user: ${user}`);
        return;
    }

    if (user.priv_id !== 1) {
        res.status(403).send(`Invalid user: ${user}`);
        return;
    }

    try {
        const { descripcion, desde, hasta, lugar, nombre, organizador, publicacion, url, id, user } = req.body

        const update = await updatePost(nombre, descripcion, desde, hasta, publicacion, lugar, organizador, url, user, id)

        return res.status(200).json({message: 'Exito', result: update, status: 200 })
    } catch ( error ) {
        return res.status(400).json({ message: "Bad Reqeuest", error , status: 400 })
    }
})