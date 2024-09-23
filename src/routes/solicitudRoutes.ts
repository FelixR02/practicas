import { Router } from "express";
import { crearSolicitante, deleteSolicitante, getSolicitante, getSolicitantes, updateSolicitante } from "../controllers/solicitud.controller";

const router = Router()

router.post("/crearSolicitante",crearSolicitante )
router.get("/solicitantes",getSolicitantes )
router.put("/solicitanteUpdate/:id", updateSolicitante)
router.delete("/solicitanteDelete/:id", deleteSolicitante)
router.get("/solicitante/:id", getSolicitante)

export default router