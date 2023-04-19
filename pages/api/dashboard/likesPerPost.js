import { pool } from "../../../config/dbConnection";
import { MyQuerys } from "../../../lib/querys";
import withSession from "../../../lib/session";

export default withSession(async (req, res) => {

    if (req.method !== "GET") { 
        return res.status(400).json({ message: "Bad request" })
    }

    const user = req.session.get("user")

    if (!user) {
        res.status(401).send(`Invalid user: ${user}`)
        return;
    }

    if (user.priv_id !== 1) {
        res.status(403).send(`Invalid user: ${user}`);
        return;
    }

    const { numOflikesPost } = MyQuerys

    const [response] = await pool.query(numOflikesPost)

    //const values = response.map((item) => item.numlikexpub)
    //const labels = response.map((item) => item.pub_titulo)

    const labels = ['No. Likes']

    const colors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ]

    const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ]

    const datasets = response.map((item, index) => {
        return {
            label: item.pub_titulo,
            data: [item.numlikexpub],
            backgroundColor: colors[getRandomInt(0,5)]
        }
    })

    const data = {
        labels: labels,
        datasets: datasets
    };

    return res.status(200).json({ message: "OK", data: data })
})

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}