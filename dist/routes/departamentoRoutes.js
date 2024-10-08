"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_controller_1 = require("../controllers/departamento.controller");
const router = (0, express_1.Router)();
router.post("/crearDepartamento", departamento_controller_1.crearDepartamento);
router.get("/departamentos", departamento_controller_1.getDepartamentos);
router.put("/departamentoUpdate/:id", departamento_controller_1.updateDepartamentos);
router.delete("/departamentoDelete/:id", departamento_controller_1.deleteDepartamentos);
router.get("/departamento/:id", departamento_controller_1.getDepartamento);
exports.default = router;
