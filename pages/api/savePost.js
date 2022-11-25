import { newPost } from "../../lib/postProcedures";

export default async function SevePost(req, res) {
    switch (req.method) {
        case "GET":
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
        case "POST":
            try {
                const { nombre, file, desc, esp, inicio, final, fecha, lugar, org, url, escuela, user } = req.body
                const post = await newPost(nombre, desc, org, file, inicio, final, fecha, lugar, url, escuela, esp, user)
                return res.status(200).json({message: 'Exito', result: post, status: 200 })
            } catch (err) {
                return res.status(200).json({ message: 'Error', result: err, status: 408 })
            }
    }
} 