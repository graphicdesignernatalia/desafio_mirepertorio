const express = require("express");
const app = express();
const { guardarCancion, getCanciones, actualizarCancion, eliminarCancion } = require("./consultas");
const port = 4321;

//middleware para manejar datos JSON
app.use(express.json());
/* app.use(express.static('public')); */


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//ruta para agregar una nueva canción
app.post("/cancion", async (req, res) => {
    try {
        const { titulo, artista, tono } = req.body;
        const result = await guardarCancion(titulo, artista, tono);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todas las canciones
app.get("/canciones", async (req, res) => {
    try {
        const canciones = await getCanciones();
        res.json(canciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//ruta para actualizar una canción existente
app.put("/cancion/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, artista, tono } = req.body;
        const result = await actualizarCancion(id, titulo, artista, tono);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//ruta para eliminar una canción por su ID
app.delete("/cancion", async (req, res) => {
    try {
        const { id } = req.query;
        const result = await eliminarCancion(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
