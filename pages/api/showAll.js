import { pool } from "../../config/dbConnection"
import { MyQuerys } from "../../lib/querys"

export default async function ShowAll(req, res) {
    switch (req.method) {
        case "POST":
            return res.status(400).json({ message: "Bad request", status: 400 })
        case "GET":
            try {

                const { fetchAll } = MyQuerys
                const [response] = await pool.query(fetchAll)

                if (response.length === 0) {
                    return res.status(404).json(
                        {
                            message: {
                                Found: response.length
                            },
                            result: "Not found",
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

            } catch (error) {
                return res.status(404).json(
                    {
                        message: "error",
                            //Found: response?.length,
                        result: ["Not found", error],
                        status: 404
                    }
                )
            }
    }
}