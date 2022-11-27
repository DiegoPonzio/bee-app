import { MyQuerys } from "../../../../../lib/querys"
import { format } from "mysql2"
import { pool } from "../../../../../config/dbConnection"

export default async function ShowTempById(req, res) {
    switch (req.method) {
        case "GET":
            const { id } = req.query
            const { fetchTempById } = MyQuerys
            const q = format(fetchTempById, [
                id
            ])
            const [response] = await pool.query(q)
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
