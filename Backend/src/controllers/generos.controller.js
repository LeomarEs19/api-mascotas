import { pool } from "../database/conexion.js";

export const getGenero = async (req, res) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM genero');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No se encontraron generos' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const setGenero = async (req, res) => {
    try {
        const { nombre } = req.body;
        const [ result ] = await pool.query('INSERT INTO gendero(nombre) values (?)', [nombre]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'genero creado con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo crear el genero' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}