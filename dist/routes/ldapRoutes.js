"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connAC_1 = require("../connAC"); // Asegúrate de ajustar la ruta al archivo correcto
const router = express_1.default.Router();
// Configuración de la ruta para obtener un solicitante por ID
router.get('/obtenerSolicitante/:id', connAC_1.obtenerSolicitante);
exports.default = router;
