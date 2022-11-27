import { MyQuerys } from "../../../../../../lib/querys"
import { format } from "mysql2"
import { pool } from "../../../../../../config/dbConnection"


export default async function ShowByArea (req, res) {
    switch (req.method) {
        case "POST":
            return res.status(400).json({ message: "Bad Request", status: 400 })
        case "GET":
            const {cecyt, area} = req.query
            const {fetchByAera} = MyQuerys
            const q = format(fetchByAera, [
                area,
                cecyt
            ])
            const [response] = await pool.query(q)
            pool.end()
            //validar el cecyt
            //validar el area

            //si esta vacio
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

            return res.status(400).json(
                {
                    message: {
                        Found: response.length
                    },
                    result: response,
                    status: 200
                }
            )
        default:
            
    }
}