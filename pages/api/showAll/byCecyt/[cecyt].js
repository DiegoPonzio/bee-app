import { pool } from "../../../../config/dbConnection"
import { MyQuerys } from "../../../../lib/querys"
import { format } from 'mysql2'

export default async function ShowByCecyt(req, res) { 
    switch (req.method) {
        case "POST":
            return res.status(400).json({ message: "Bad request", status: 400 })
        case "GET":
            const { cecyt }  = req.query
            const { fetchByCecyt } = MyQuerys
            const q = format(fetchByCecyt, [
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
                            message: "Error, no posts found"
                        },
                        status: 404
                    }
                )
            }

            return res.status(200).json(
                {
                    message: {
                        Found: response.length
                    },
                    result: response,
                    status: 200
                }
            )
    }
}