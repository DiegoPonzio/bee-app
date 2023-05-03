import { pool } from "../../../../config/dbConnection"
import { MyQuerys } from "../../../../lib/querys"
import { format } from 'mysql2'
import withSession from "../../../../lib/session";

export default withSession(async (req, res) => {
    if(req.method !== "GET"){
        res.status(405).send(`Invalid method: ${req.method}`);
        return;
    }
    const user = req.session.get("user")

    if (!user) {
        res.status(401).send(`Invalid user: ${user}`);
        return;
    }

    if (user.priv_id === 1 || user.priv_id === 4) {
        res.status(403).send(`Invalid user: ${user}`);
        return;
    }

    const { user: userB } = req.query
    const { fetchByUser } = MyQuerys

    const q = format(fetchByUser, [
        userB
    ])

    const [response] = await pool.query(q)

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
})