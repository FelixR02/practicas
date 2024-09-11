import {Router} from 'express';
import { buscarUsuarioEnLDAP, crearUsuarioDesdeSolicitante } from '../connAC'; // Asegúrate de ajustar la ruta al archivo correcto

const router = Router();

// Configuración de la ruta para obtener un solicitante por ID

router.post('/crear-usuario', crearUsuarioDesdeSolicitante);
router.get('/buscar-usuario/:username', buscarUsuarioEnLDAP);



export default router;