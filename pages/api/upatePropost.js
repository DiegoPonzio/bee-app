import { updatePropost } from "../../lib/postProcedures"

export default async function UpdatePost (req, res) {
    switch (req.method) {
        case "PUT": 
            try {
                const { id, status } = req.body
                
                const update = await updatePropost(id, status)

                return res.status(200).json({message: 'Exito', result: update, status: 200 })
            } catch ( error ) {
                return res.status(400).json({ message: "Bad Reqeuest", error , status: 400 })
            }
    
        default:
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
    }
}