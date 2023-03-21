import { addLike, deleteLike, fetchPostNLike } from "../../../lib/postProcedures"
import withSession from "../../../lib/session"

export default withSession(async (req, res) => {

    const user = req.session.get("user")

    if (!user) {
        res.status(401).send(`Invalid user: ${user}`);
        return;
    }

    switch (req.method) {
        case "GET":
            //ver si hay like
            const { paths } = req.query
            if (paths.length > 2 || paths.length === 1) {
                return res.status(404).json({ message: "not good query", paths })
            }
            const [userG, postG] = paths

            if (user.usu_nombre !== userG) {
                res.status(403).send(`Invalid user: ${user}`);
            }

            const newLike = await fetchPostNLike(userG, postG)
            return res.status(200).json({ message: "OK", newLike })
        case "POST":
            //insertar like
            try {
                const { user: userP, post } = req.body

                if (user.usu_nombre !== userP) {
                    res.status(403).send(`Invalid user: ${user}`);
                }

                const postLike = await addLike(userP, post)
                return res.status(200).json({ message: "OK", postLike })
            } catch (error) {
                return res.status(400).json({message: "Bad Request", error})
            }
        case "DELETE":
            //se borra el like
            try {
                const { paths } = req.query 
                const [userD, postD] = paths

                if (user.usu_nombre !== userD) {
                    res.status(403).send(`Invalid user: ${user}`);
                }    

                const DeleteLike = await deleteLike(userD, postD)
                return res.status(200).json({ message: "OK", response: DeleteLike })
            } catch (error) {
                return res.status(400).json({message: "Bad Request", error})
            }

        default:
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
    }
})