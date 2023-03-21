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

    return result
}

const deletePost = async id => {
    const { deletePost } = MyQuerys

    const query = format(deletePost, [
        id
    ])
    const result = await pool.query(query)
    return result
}

const deleteComments = async id => {
    const { deleteComment } = MyQuerys

    const query = format(deleteComment, [
        id
    ])

    const result = await pool.query(query)
    return result
}

const deleteLikes = async id => {
    const { deleteLike } = MyQuerys
    
    const query = format(deleteLike, [
        id
    ])

    const result = await pool.query(query)
    return result
}

const updatePost = async (title, description, start, end, date, place, who, url, id_usu, id) => {
    const { updatePost } = MyQuerys

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
    return result
}

const updatePropost = async (id, state) => {
    const { updatePropost } = MyQuerys

    const query = format(updatePropost, [
        state,
        id
    ])
    const result = await pool.query(query)
    return result
}

const newComment = async (nombre, commentario, id) => {
    const { addComment } = MyQuerys

    const query = format(addComment, [
        commentario,
        id,
        nombre
    ])
    const result = await pool.query(query)
    return result
}

const addLike = async (user, post) => {
    const { addLikeU } = MyQuerys

    const query = format(addLikeU, [
        user,
        post
    ])
    const result = await pool.query(query)
    return result
}

const deleteLike = async (user, post) => {
    const { deleteLikeU } = MyQuerys

    const query = format(deleteLikeU, [
        user,
        post
    ])
    const result = await pool.query(query)
    return result
}

const fetchIFLikeU = async (user, post) => {
    const { fetchIfLikesU } = MyQuerys

    const query = format(fetchIfLikesU, [
        user,
        post
    ])
    const [response] = await pool.query(query)

    return response.length === 1 ? true : false
}

const fetchPostNLike = async (user, inst) => {
    const { fetchPostsNLikes, fetchLikesU } = MyQuerys

    const query1 = format(fetchPostsNLikes, [
        inst
    ])
    const [response] = await pool.query(query1)

    const query2 = format(fetchLikesU, [
        user
    ])
    const [responseLike] = await pool.query(query2)

    const userLikes = response.map( id => {
        const { pub_id } = id
        return responseLike.find( element => element.pub_id === pub_id) ? true : false
    })

    return userLikes
}

export { newPost, newPropost, deletePost, updatePost, updatePropost, newComment, addLike, fetchIFLikeU, deleteLike, fetchPostNLike, deleteComments, deleteLikes }