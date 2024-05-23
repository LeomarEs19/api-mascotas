import { pool } from "../database/conexion.js";

export const getCategoria = async (req, res) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM categoria');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No se encontraron categorias' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const setCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const [ result ] = await pool.query('INSERT INTO categoria(nombre) values (?)', [nombre]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'categoria creada con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo crear la categoria' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}