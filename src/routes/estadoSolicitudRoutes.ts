import { Router } from "express";
import { crearEstadoSolicitud, deleteEstado, getEstado, updateEstado } from "../controllers/estadoSolicitud.controller";


const router = Router()

router.post("/crearEstado",crearEstadoSolicitud )
router.get("/estados",getEstado )
router.put("/estadoUpdate/:id", updateEstado)
router.delete("/estadoDelete/:id", deleteEstado)
router.get("/estado/:id", getEstado)

export default router