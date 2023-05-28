import { pool } from '../../config/dbConnection'
export default async function EmailUser (req, res) {
    if (req.method !== "POST") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }

    try {
        const {email, admin, message} = req.body;
        const [response] = await pool.query('SELECT * FROM usuario WHERE usu_id = ?', [email]);
        const {usu_nombre, usu_clave} = response[0];

        return res.status(200).json({ usu_nombre, usu_clave });
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error");
    }
}