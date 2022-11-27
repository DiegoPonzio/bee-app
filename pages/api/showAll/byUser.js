import { pool } from "../../../config/dbConnection" 
import { MyQuerys } from "../../../lib/querys"

export default async function ShowByUser(req, res) {
    switch (req.method) {
        case "Post":
            return res.status(400).json({ message: "Bad request", status: 400 })    
        
        case "GET":
            const { fetchByAllUsers } = MyQuerys
            const [response] = await pool.query(fetchByAllUsers)
            pool.end()
            //validar si es que tiene los permisos el usuario

            //si esta vacio
            if (response.length === 0) {
                return res.status(404).json(
                    {
                        message: {
                            Found: 0,
                            message: "Error, no posts found"
                        },
                        status: 404
                    }
                )                    
            }

            return res.status(200).json(
                {
                    message: {
                        Found: response.length,
                        message: "Complete successfully"
                    },
                    result: response,
                    status: 200
                }
            )

        default:
            return res.status(400).json({ message: "Bad request", status: 400 })
    }
}