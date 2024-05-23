import { Router } from "express";
import { getCategoria, setCategoria } from "../controllers/categorias.controller.js";

const router = Router()

router.get("/categoria", getCategoria)
router.post("/categoria", setCategoria)

export default router