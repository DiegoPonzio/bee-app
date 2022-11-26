import { format } from "mysql2";
import { pool } from "../../config/dbConnection";
import { MyQuerys } from "../../lib/querys";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
    //se verifica por back
    switch (req.method) {
        case "POST":
            try {
                const { userName, hashPAss, userEmail, userRFC, tipoCuenta, userCedula, password1 } = req.body
                const cedula = userCedula ? userCedula : null
                const RFC = userRFC ? userRFC : null
                const privId = tipoCuenta === "Empresa" ? 3 : 2
                const { addEgresado } = MyQuerys
                const q = format(addEgresado, [
                    userName,
                    userEmail,
                    hashPAss,
                    RFC,
                    cedula,
                    privId
                ])
                const result = await pool.query(q)
                pool.end()
                const session = {
                    usu_id: null,
                    usu_nombre: userName,
                    usu_clave: userEmail,
                    usu_rfc: RFC,
                    //usu_cedula: cedula,   
                    priv_id: privId
                }
                await saveSession(session, req)
                return res.status(200).json({ message: "Well saved", result, status: 200 })
            } catch (error) {
                return res.status(400).json({ message: "paso algo",error, status: 400 })
            }
        case "GET":
            return res.status(405).json({ message: "Bad request", status: 405 })
    }
})

const saveSession = async (user, request) => {
    request.session.set("user", user);
    await request.session.save();
}