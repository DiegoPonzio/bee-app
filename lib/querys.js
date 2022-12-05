const MyQuerys = {
    addEgresado: 'insert into usuario (usu_nombre, usu_clave, usu_contraseña, usu_rfc, usu_cedula, priv_id) values (?, ?, ?, ?, ?, ?)',
    verfiedUser: 'SELECT * FROM usuario where usu_clave = ?',
    fetchAll: 'SELECT * FROM vw_ver',
    newPost: 'insert into publicacion (pub_titulo, pub_descripcion, pub_encargado, pub_media, pub_horainicio, pub_horafinal, pub_fecha, pub_locacion, pub_fuente, ins_id, esp_id, usu_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, (select ins_id from institucion where ins_abreviatura = ?), (select esp_id from especialidad where esp_nombre = ? ), ?)',
    fetchByCecyt: 'SELECT * FROM vw_ver WHERE ins_abreviatura = ?',
    fetchByAera: 'SELECT * FROM vw_ver WHERE area_nombre = ? AND ins_abreviatura= ?',
    fetchByEsp: 'SELECT * FROM vw_ver WHERE esp_nombre = ? AND ins_abreviatura= ?',
    fetchByEspId: 'SELECT * FROM vw_ver WHERE esp_nombre = (SELECT esp_nombre FROM especialidad WHERE esp_id = ?) AND ins_abreviatura= ?',
    fetchByUser: 'SELECT * FROM temporal WHERE usu_id = ?',
    fetchByAllUsers: 'SELECT * FROM temporal',
    fetchTempById: 'SELECT * FROM temporal where temp_id = ?',
    fetchById: 'SELECT * FROM vw_ver WHERE pub_id = ?',
    newPropost: 'INSERT INTO temporal (temp_titulo, temp_descripcion, temp_media, temp_esp, usu_id, estado_id) values (?, ?, ?, ?, ?, 1)',
    deletePost: 'DELETE FROM publicacion WHERE pub_id = ?',
    updatePost: 'UPDATE publicacion SET pub_titulo=?, pub_descripcion=?, pub_horainicio=?, pub_horafinal=?, pub_fecha=?, pub_locacion=?, pub_fuente=?, usu_id=?, pub_encargado= ? WHERE pub_id = ?',
    updatePropost: 'UPDATE temporal SET estado_id=? where temp_id = ?',
    addComment: 'INSERT INTO comentario (com_desc, com_nombre, pub_id) VALUES (?, ?, ?)',
    fetchComments: 'SELECT * FROM comentario WHERE pub_id = ?'
}

export {MyQuerys}