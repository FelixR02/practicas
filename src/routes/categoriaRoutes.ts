import { Router } from "express";
import { crearCategoria, deleteCategoria, getCategoria, getCategorias, updateCategorias } from "../controllers/categoria.controller";

const router = Router()

router.post("/crearCategoria",crearCategoria )
router.get("/categorias",getCategorias )
router.put("/categoriaUpdate/:id", updateCategorias)
router.delete("/categoriaDelete/:id", deleteCategoria)
router.get("/categoria/:id", getCategoria)

export default router