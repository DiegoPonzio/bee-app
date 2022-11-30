import { updatePost } from "../../lib/postProcedures"

export default async function UpdatePost (req, res) {
    switch (req.method) {
        case "PUT": 
            try {
                const { descripcion, desde, hasta, lugar, nombre, organizador, publicacion, url, id, user } = req.body
                
                const update = await updatePost(nombre, descripcion, desde, hasta, publicacion, lugar, organizador, url, user, id)

                return res.status(200).json({message: 'Exito', result: update, status: 200 })
            } catch ( error ) {
                return res.status(400).json({ message: "Bad Reqeuest", error , status: 400 })
            }
    
        default:
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
    }
}