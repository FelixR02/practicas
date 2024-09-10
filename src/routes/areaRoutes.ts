import { Router } from "express";
import { crearArea, deleteAreas, getArea, getAreas, updateAreas } from "../controllers/area.controller";

const router = Router()

router.post("/crearArea",crearArea )
router.get("/areas",getAreas )
router.put("/areaUpdate/:id", updateAreas)
router.delete("/areaDelete/:id", deleteAreas)
router.get("/area/:id", getArea)

export default router