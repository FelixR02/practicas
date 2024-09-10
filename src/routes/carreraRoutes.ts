import { Router } from "express";
import { crearCarrera, deleteCarrera, getCarrera, getCarreras, updateCarreras, } from "../controllers/carrera.controller";

const router = Router()

router.post("/crearCarrera",crearCarrera )
router.get("/carreras",getCarreras )
router.put("/carreraUpdate/:id", updateCarreras)
router.delete("/carreraDelete/:id", deleteCarrera)
router.get("/carrera/:id", getCarrera)

export default router