import { format } from "mysql2"
import { validate } from "../../config/comperePassword"
import { pool } from "../../config/dbConnection"
import { MyQuerys } from "../../lib/querys"
import withSession from "../../lib/session"

export default withSession(async (req, res) => {
    switch (req.method) {
        case "POST":
            try {
                const { username, password } = req.body
                const { verfiedUser } = MyQuerys
                const query = format(verfiedUser, [
                    username
                ])
                const [response] = await pool.query(query)
                if (response.length !== 0) {
                    const { usu_contraseña } = response[0]
                    const bytesString = String.fromCharCode(...usu_contraseña)
                    if (await validate(password, bytesString)) {
                        await saveSession(response[0], req)
                        const { priv_id } = response[0]
                        return res.status(200).json({ message: "Acepted", result: response, userType: priv_id  ,status: 200 })
                    } else {
                        return res.status(200).json({ message: "Empty", result: response, status: 401 })
                    }
                } else {
                    return res.status(200).json({ message: "Empty", result: response, status: 401 })
                }
            } catch (err) {
                return res.status(200).json({ message: 'Erro Time out', result: err, status: 408 })
            }
        case "GET":
            return res.status(400).json({ message: "Bad request" })
    }
})

async function saveSession(user, request) {
    request.session.set("user", user);
    await request.session.save();
}