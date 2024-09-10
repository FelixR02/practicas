import { Router } from "express";
import { crearDepartamento, deleteDepartamentos, getDepartamento, getDepartamentos, updateDepartamentos } from "../controllers/departamento.controller";

const router = Router()

router.post("/crearDepartamento",crearDepartamento)
router.get("/departamentos",getDepartamentos )
router.put("/departamentoUpdate/:id", updateDepartamentos)
router.delete("/departamentoDelete/:id", deleteDepartamentos)
router.get("/departamento/:id", getDepartamento)

export default router