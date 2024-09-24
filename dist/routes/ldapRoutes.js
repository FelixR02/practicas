"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connAC_1 = require("../connAC"); // Asegúrate de ajustar la ruta al archivo correcto
const router = (0, express_1.Router)();
// Configuración de la ruta para obtener un solicitante por ID
router.post('/crear-usuario', connAC_1.crearUsuarioDesdeSolicitante);
exports.default = router;
