import { Router } from "express";
import { cargarImagen, createPets, deletePets, showAPets, showPets, updatePets } from "../controllers/mascotas.controller.js";

const router = Router();

router.get("/mascota", showPets)
router.post("/mascota",cargarImagen, createPets)
router.put("/mascota/:id",cargarImagen, updatePets)
router.get("/mascota/:id", showAPets)
router.delete("/mascota/:id", deletePets)

export default router