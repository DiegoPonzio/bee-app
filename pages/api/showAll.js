import { pool } from "../../config/dbConnection"
import { MyQuerys } from "../../lib/querys"

export default async function ShowAll(req, res) {
    switch (req.method) {
        case "POST":
            return res.status(400).json({ message: "Bad request", status: 400 })
        case "GET":
            const { serch } = req.query
            const { fetchAll } = MyQuerys
            const [response] = await pool.query(fetchAll)
            pool.end()
            switch(serch) {
                case "Escolar":
                    return res.status(200).json(
                        {
                            message: {
                                Found: response.length
                            },
                            result: serch,
                            status: 200
                        }
                    )
                case "Extracurricular":
                    return res.status(200).json(
                        {
                            message: {
                                Found: response.length
                            },
                            result: serch,
                            status: 200
                        }
                    )
                case "De Carrera":
                    return res.status(200).json(
                        {
                            message: {
                                Found: response.length
                            },
                            result: serch,
                            status: 200
                        }
                    )

                case undefined:
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
}