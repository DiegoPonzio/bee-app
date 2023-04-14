import withSession from "../../../lib/session";
import {editUserEmail, editUserName, editUserRfc} from "../../../lib/postProcedures";
import {validate} from "../../../config/comperePassword";

export  default  withSession(async (req, res) => {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { id } = req.query

    const user = req.session.get('user')

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    if (user.usu_id !== Number(id)) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    try {
        const {id} = req.query, {item, edited, password} = req.body;

        const bytesString = String.fromCharCode(...user.usu_contraseña.data)

        const isPassword = await validate(password, bytesString)

        if (!isPassword) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const myItem = Number(item)

        if (myItem !== 1 && myItem !== 2 && myItem !== 4){
            return res.status(400).json({ message: 'Bad Request' })
        }

        const response = myItem === 1 ? await editUserName(edited, id) :
            myItem === 2 ? await editUserEmail(edited, id) :
                myItem === 4 ? await editUserRfc(edited, id) : null

        return res.status(200).json({ message: 'Exito', result: response, status: 200 })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Bad Request' })
    }

})