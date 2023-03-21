import { newPost } from "../../lib/postProcedures";
import withSession from "../../lib/session";

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

    if (user.priv_id !== 1) {
        res.status(403).send(`Invalid user: ${user}`);
        return;
    }

    try {
        const { nombre, file, desc, esp, inicio, final, fecha, lugar, org, url, escuela, user } = req.body

        if (user.usu_id !== user) {
            res.status(403).send(`Invalid user: ${user}`);
            return;
        }

        const post = await newPost(nombre, desc, org, file, inicio, final, fecha, lugar, url, escuela, esp, user)

        return res.status(200).json({message: 'Exito', result: post, status: 200 })
    } catch (error) {
        return res.status(200).json({ message: 'Error', result: error, status: 408 })
    }
})