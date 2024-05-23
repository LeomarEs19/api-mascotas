import {Router} from 'express'
import { getRazas, setRazas } from '../controllers/razas.controller.js'

const router = Router()

router.get("/razas", getRazas)
router.post("/razas", setRazas)

export default router