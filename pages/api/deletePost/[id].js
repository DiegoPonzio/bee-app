import { deleteComments, deleteLikes, deletePost } from "../../../lib/postProcedures"
import withSession from "../../../lib/session"

export default withSession(async (req, res) => {

    if (req.method !== "DELETE") {
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
        const { id } = req.query

        //borrar todos los comentarios del post
        const deletedComments = await deleteComments(id)

        //borrar todos los likes del post
        const deletedLikes = await deleteLikes(id)

        //borrar el post
        const deleted = await deletePost(id)

        return res.status(200).json({message: 'Exito', result: {deleted, deletedComments, deletedLikes}, status: 200 })
    } catch (error) {
        return res.status(400).json({ message: "Bad Reqeuest", error , status: 400 })
    }
})