import { addLike, deleteLike, fetchPostNLike } from "../../../lib/postProcedures"

export default async function VerifLike(req, res) {
    switch (req.method) {
        case "GET":
            //ver si hay like
            const { paths } = req.query
            if (paths.length > 2 || paths.length === 1) {
                return res.status(404).json({ message: "not good query", paths })
            }
            const [userG, postG] = paths

            const newLike = await fetchPostNLike(userG, postG)
            return res.status(200).json({ message: "OK", newLike })
        case "POST":
            //insertar like
            try {
                const { user, post } = req.body
                const postLike = await addLike(user, post)
                return res.status(200).json({ message: "OK", postLike })
            } catch (error) {
                return res.status(400).json({message: "Bad Request", error})
            }
        case "DELETE":
            //se borra el like
            try {
                const { paths } = req.query 
                const [userD, postD] = paths

                const DeleteLike = await deleteLike(userD, postD)
                return res.status(200).json({ message: "OK", response: DeleteLike })
            } catch (error) {
                return res.status(400).json({message: "Bad Request", error})
            }

        default:
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
    }
}