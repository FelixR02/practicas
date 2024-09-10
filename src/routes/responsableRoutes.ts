import { Router } from "express";
import { crearResponsable, deleteResponsable, getResponsable, getResponsables, updateResponsable } from "../controllers/responsable.controller";

const router = Router()

router.post("/crearResponsable",crearResponsable )
router.get("/responsables",getResponsables )
router.put("/responsableUpdate/:id", updateResponsable)
router.delete("/responsableDelete/:id", deleteResponsable)
router.get("/responsable/:id", getResponsable)

export default router