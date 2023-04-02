import withSession from "../../../lib/session";
import { MyQuerys } from "../../../lib/querys";
import { pool } from "../../../config/dbConnection";

export default withSession(async (req, res) => {

    if (req.method !== "GET") {
        return res.status(400).json({ message: "Bad request" })
    }

    const user = req.session.get("user");

    if (!user) {
        res.status(401).send(`Invalid user: ${user}`);
        return;
    }

    if (user.priv_id !== 1) {
        res.status(403).send(`Invalid user: ${user}`);
        return;
    }

    const { adminNumOfPosts } = MyQuerys

    const [response] = await pool.query(adminNumOfPosts)
    /*
        const data = {
            labels: [],
            datasets:[
                {
                    labels: "No. Comunicados:",
                    data: [],
                    backgroundColor: [
                        //colores valeria
                        //rgba color por cada dato
                    ],
                    borderColor: [
                        //colores valeria
                        //rgba color por cada dato
                    ],
                    borderWidth: 1
                }
            ],
        }
     */

    const values = response.map((item) => item.numpub)
    const labels = response.map((item) => item.usu_nombre)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'No. comunicados',
                data: values,
                backgroundColor: [
                    'rgba(0,177,191,255)',
                    'rgba(0,133,182,255)',
                    'rgba(0,212,157,255)',
                    'rgba(254,223,3,255)',
                    'rgba(255,0,93,255)',
                ],
                borderColor: [
                    'rgba(0,177,191,255)',
                    'rgba(0,133,182,255)',
                    'rgba(0,212,157,255)',
                    'rgba(254,223,3,255)',
                    'rgba(255,0,93,255)',
                ],
                borderWidth: 1,
            }
        ]
    };

    return res.status(200).json({ message: "OK", data: data })

});