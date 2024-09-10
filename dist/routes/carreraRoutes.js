"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrera_controller_1 = require("../controllers/carrera.controller");
const router = (0, express_1.Router)();
router.post("/crearCarrera", carrera_controller_1.crearCarrera);
router.get("/carreras", carrera_controller_1.getCarreras);
router.put("/carreraUpdate/:id", carrera_controller_1.updateCarreras);
router.delete("/carreraDelete/:id", carrera_controller_1.deleteCarrera);
router.get("/carrera/:id", carrera_controller_1.getCarrera);
exports.default = router;
