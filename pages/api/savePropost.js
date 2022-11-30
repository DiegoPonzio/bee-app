import { newPropost } from "../../lib/postProcedures"

export default async function SavePropost(req, res) {
    switch (req.method) {
        case "GET":
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
        case "POST":
            try {
                const { nombre, especialidad, descripcion, file, usuario } = req.body
                const proPost = await newPropost(nombre, especialidad, descripcion, file, usuario)
                return res.status(200).json({
                    message: "Save Correctly",
                    result: proPost
                })

            } catch (error) {

                return res.status(400).json({
                    message: "Something went wrong",
                    result: error
                })
            }
    }
}