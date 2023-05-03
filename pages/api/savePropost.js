import { newPropost } from "../../lib/postProcedures"
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

    if (user.priv_id === 1 || user.priv_id === 4) {
        res.status(403).send(`Invalid user: ${user}`);
        return;
    }

    try {
        const { nombre, especialidad, descripcion, file, usuario } = req.body
        
        const proPost = await newPropost(nombre, especialidad, descripcion, file, usuario)

        return res.status(200).json({message: 'Exito', result: proPost, status: 200 })
    } catch ( error ) {
        return res.status(400).json({ message: "Bad Reqeuest", error , status: 400 })
    }
})