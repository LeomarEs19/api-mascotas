import { Router } from "express";
import { getGenero, setGenero } from "../controllers/generos.controller.js";

const router = Router()

router.get("/genero", getGenero)
router.post("/genero", setGenero)

export default router