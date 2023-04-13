import {MyQuerys} from "../../../lib/querys";
import withSession from "../../../lib/session";
import {format} from "mysql2";
import {pool} from "../../../config/dbConnection";

export  default  withSession(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(400).json({ message: "Bad request", status: 400 })
    }

    const user = req.session.get("user")

    if (!user) {
        res.status(401).json({
            message: "Unauthorized",
            status: 401
        });
        return;
    }

    const { id } = req.query

    if (user.usu_nombre !== id) {
        res.status(401).json({
            message: "Unauthorized",
            status: 401
        });
        return;
    }

    try {
        const { id } = req.query
        const { userLikes } = MyQuerys
        const query = format(userLikes, [id])

        const [response] = await pool.query(query)

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
})