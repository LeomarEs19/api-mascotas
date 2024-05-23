import { pool } from "../database/conexion.js";

export const getRazas = async (req, res) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM raza');
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No se encontraron razas' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const setRazas = async (req, res) => {
    try {
        const { nombre } = req.body;
        const [ result ] = await pool.query('INSERT INTO raza(nombre) values (?)', [nombre]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'raza creada con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo crear la raza' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}