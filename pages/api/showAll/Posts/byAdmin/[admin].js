import { format } from "mysql2"
import { pool } from "../../../../../config/dbConnection"
import { MyQuerys } from "../../../../../lib/querys"
import withSession from "../../../../../lib/session"

export default withSession(async (req, res) => {

    if (req.method !== "GET") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }

    const user = req.session.get("user")

    if (!user) {
        res.status(401).send(`Invalid user: ${user}`);
        return;
    }

    if (user.priv_id !== 1) {
        res.tatus(403).send(`Invalid user: ${user}`);
        return;
    }

    try {
        const { admin } = req.query

        const { fetchAdminsPost } = MyQuerys
        const q = format(fetchAdminsPost, [admin])

        if (user.usu_id !== Number(admin)) {
            res.status(403).send(`Invalid user: ${user}`);
            return;
        }
        
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

    } catch (error) {
        return res.status(408).json({ message: 'Error', result: error, status: 408 })
    }
})