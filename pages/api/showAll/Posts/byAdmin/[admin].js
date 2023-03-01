import { format } from "mysql2"
import { pool } from "../../../../../config/dbConnection"
import { MyQuerys } from "../../../../../lib/querys"

export default async function ShowByAdminId(req,res){
    switch(req.method){
        case "GET":
            const { admin } = req.query
            const { fetchAdminsPost } = MyQuerys
            const q = format(fetchAdminsPost, [admin])

            const [response] = await pool.query(q)

            if(response.length === 0) {
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