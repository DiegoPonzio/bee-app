import { format } from "mysql2"
import { pool } from "../config/dbConnection"
import { MyQuerys } from "./querys"

const newPost = async (pub_titulo, pub_descripcion, pub_encargado, pub_media, pub_horainicio, pub_horafinal, pub_fecha, pub_locacion, pub_fuente, ins_id, esp_id, usu_id) => {
    const { newPost } = MyQuerys

    const query = format(newPost, [
        pub_titulo,
        pub_descripcion,
        pub_encargado,
        pub_media,
        pub_horainicio,
        pub_horafinal,
        pub_fecha,
        pub_locacion,
        pub_fuente,
        ins_id,
        esp_id,
        usu_id
    ])

    const result = await pool.query(query)
    pool.end()

    return result
}

const newPropost = async (nombre, especialidad, descripcion, file, usu_id) => {
    const { newPropost } = MyQuerys

    const query = format(newPropost, [
        nombre,
        descripcion,
        file,
        especialidad,
        usu_id,
    ])

    const result = await pool.query(query)
    pool.end()

    return result
}

const deletePost = async id => {
    const { deletePost } = MyQuerys

    const query = format(deletePost, [
        id
    ])
    const result = await pool.query(query)
    pool.end()
    return result
}

const updatePost = async (title, description, start, end, date, place, who, url, id_usu, id) => {
    const {updatePost} = MyQuerys

    const query = format(updatePost, [
        title,
        description,
        start,
        end,
        date,
        place,
        url,
        id_usu,
        who,
        id
    ])
    const result = await pool.query(query)
    pool.end()
    return result
}

const updatePropost = async (id, state) => {
    const { updatePropost } = MyQuerys
    
    const query = format(updatePropost, [
        state,
        id
    ])
    const result = await pool.query(query)
    pool.end()
    return result
}


export { newPost, newPropost, deletePost, updatePost, updatePropost }