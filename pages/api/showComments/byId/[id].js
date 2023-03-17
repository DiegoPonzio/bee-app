import { format } from 'mysql2'
import { pool } from '../../../../config/dbConnection'
import { MyQuerys } from '../../../../lib/querys'

export default async function showCommentById(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query
                const { fetchComments } = MyQuerys

                const query = format(fetchComments, [id])

                const [result] = await pool.query(query)
                const reverse = result.reverse()

                return res.status(200).json({ message: "Exito", result: reverse, status: 200 })
            } catch (err) {
                return res.status(408).json({ message: 'Error', result: err, status: 408 })
            }
        default:
            return res.status(400).json({ message: "Bad Reqeuest", status: 400 })
    }
}