import { deletePost } from "../../../lib/postProcedures"

export default async function DeletePost(req, res) {
    switch (req.method) {
        case "DELETE":
            try{
                const {id} = req.query
            
                const deleted = await deletePost(id)
    
                return res.status(200).json({message: 'Exito', result: deleted, status: 200 })
            } catch (error) {
                return res.status(400).json({ message: "Bad Reqeuest", error , status: 400 })
            }
           

        default:
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
    }
}