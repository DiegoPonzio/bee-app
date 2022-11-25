import { MyQuerys } from "../../../../../../lib/querys";
import { format } from "mysql2"
import { pool } from "../../../../../../config/dbConnection";

export default async function ShowByEsp (req, res) {
    switch (req.method) {
        case "POST":
            return res.status(400).json({ message: "Bad request", status: 400 })
        case "GET":

            const { cecyt, esp } = req.query
            const { fetchByEsp } = MyQuerys
            const q = format(fetchByEsp, [
                esp,
                cecyt
            ])
            const [response] = await pool.query(q)

            //validacion si lo escrito no es un cecyt como tal

            //si esta vacio
            if (response.length === 0) {
                return res.status(404).json(
                    {
                        message: {
                            Found: 0,
                            message: "Error, no post found"
                        },
                        status: 404
                    }
                )
            }

            return res.status(400).json(
                {
                    message: {
                        Found: response.length,
                        message: "Complete successfully"
                    },
                    result:response,
                    status: 200
                }
            )
        default:
            break;
    }
}