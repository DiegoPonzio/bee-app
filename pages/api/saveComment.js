import { newComment } from "../../lib/postProcedures"


export default async function saveComment(req, res){
    switch (req.method) {
        case "POST":
            try{
                const { name, comentario, id } = req.body

                const comment = await newComment(name, comentario, id)

                return res.status(200).json({ message: "Exito", result: comment, status: 200 })
            } catch (error) {
                return res.status(408).json({ message: 'Error', result: err, status: 408 })
            }
    
        default:
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
    }
}