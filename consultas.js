const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "repertorio",
    password: "Theshowmustgoon82",
    port: 5432
});

//const para guardar una nueva canción en la base de datos
const guardarCancion = async (titulo, artista, tono) => {
    const query = {
        text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *",
        values: [titulo, artista, tono]
    };
    const result = await pool.query(query);
    return result.rows[0];
};

//const para obtener todas las canciones de la base de datos
const getCanciones = async () => {
    const result = await pool.query("SELECT * FROM canciones");
    return result.rows;
};

//const para actualizar una canción en la base de datos por su ID
const actualizarCancion = async (id, titulo, artista, tono) => {
    const query = {
        text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *",
        values: [titulo, artista, tono, id]
    };
    const result = await pool.query(query);
    return result.rows[0];
};

//const para eliminar una canción de la base de datos por su ID
const eliminarCancion = async (id) => {
    const query = {
        text: "DELETE FROM canciones WHERE id = $1 RETURNING *",
        values: [id]
    };
    const result = await pool.query(query);
    return result.rows[0];
};

module.exports = {
    guardarCancion,
    getCanciones,
    actualizarCancion,
    eliminarCancion
};
