import express from 'express';
import { obtenerSolicitante } from '../connAC'; // Asegúrate de ajustar la ruta al archivo correcto

const router = express.Router();

// Configuración de la ruta para obtener un solicitante por ID
router.get('/obtenerSolicitante/:id', obtenerSolicitante);

export default router;