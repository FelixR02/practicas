import { Router } from "express";
import { crearSolicitud, deleteSolicitud, getSolicitud, getSolicitudes, updateSolicitud } from "../controllers/solicitud.controller";

const router = Router()

router.post("/crearSolicitud",crearSolicitud )
router.get("/solicitudes",getSolicitudes )
router.put("/solicitudUpdate/:id", updateSolicitud)
router.delete("/solicitudDelete/:id", deleteSolicitud)
router.get("/solicitud/:id", getSolicitud)

export default router