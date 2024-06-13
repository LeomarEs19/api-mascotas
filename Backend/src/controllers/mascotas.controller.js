import { pool } from "../database/conexion.js";
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

export const cargarImagen = upload.single('imagen');

export const showPets = async (req, res) => {
    try {
        const query = `
            SELECT 
                pets.id AS id,
                pets.nombre_mascota,
                raza.nombre AS nombre_raza,
                pets.imagen
            FROM 
                pets
            JOIN 
                raza ON pets.raza_id = raza.id
        `;
        const [result] = await pool.query(query);
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No se encontraron mascotas' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const createPets = async (req, res) => {
    try {
        const { nombre_mascota, raza_id, categoria_id, genero_id, user_id } = req.body;
        const imagen = req.file ? req.file.originalname : null; // Verifica si req.file está definido
        const [result] = await pool.query('INSERT INTO pets (nombre_mascota, raza_id, categoria_id, imagen, genero_id, user_id) values (?, ?, ?, ?, ?, ?)', [nombre_mascota, raza_id, categoria_id, imagen || null, genero_id, user_id || null]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'Mascota creada con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo crear la mascota' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const showAPets = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT pets.*, nombre_mascota, imagen, raza.nombre AS nombre_raza, categoria.nombre AS nombre_categoria, genero.nombre AS nombre_genero FROM pets JOIN raza ON pets.raza_id = raza.id JOIN categoria ON pets.categoria_id = categoria.id JOIN genero ON pets.genero_id = genero.id WHERE pets.id=?', [id]);

        if (result.length > 0) {
            return res.status(200).json(result[0]);
        }
        return res.status(404).json({ message: 'Mascota no encontrada' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePets = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_mascota, raza_id, categoria_id, genero_id, user_id } = req.body;
        let imagen = null;
        
        // Verificar si se proporcionó una nueva imagen
        if (req.file) {
            imagen = req.file.originalname;
        }

        const [ oldPet ] = await pool.query('SELECT * FROM pets WHERE id=?', [id]);
        const [result] = await pool.query(`
            UPDATE pets 
            SET nombre_mascota=?, 
                raza_id=?, 
                categoria_id=?, 
                imagen=?, 
                genero_id=? 
            WHERE id=?`, [
                nombre_mascota ? nombre_mascota : oldPet[0].nombre_mascota,
                raza_id ? raza_id :  oldPet[0].raza_id,
                categoria_id ? categoria_id : oldPet[0].categoria_id,
                imagen ? imagen : oldPet[0].imagen, // Usa la imagen existente si no se proporciona una nueva imagen
                genero_id ? genero_id : oldPet[0].genero_id,
                id
            ]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Mascota actualizada con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo actualizar la mascota' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const deletePets = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM pets WHERE id=?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Mascota eliminada con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo eliminar la mascota' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
