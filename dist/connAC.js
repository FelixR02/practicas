"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuarioDesdeSolicitante = exports.obtenerSolicitante = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const solicitante_1 = require("./entities/solicitante");
const responsable_1 = require("./entities/responsable");
const mailer_1 = require("./mailer"); // Importa la función para enviar correos
const ActiveDirectory = require('activedirectory2');
const router = express_1.default.Router();
// Configuración de Active Directory
const config = {
    url: 'ldap://uniss.edu.cu',
    baseDN: 'cn=ldap_connection, cn=Users,dc=uniss,dc=edu,dc=cu',
    username: 'futrera@uniss.edu.cu',
    password: 'Qpmzwon3*'
};
const ad = new ActiveDirectory(config);
// Función para obtener un solicitante desde la base de datos
const findSolicitanteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const solicitanteRepository = (0, typeorm_1.getRepository)(solicitante_1.Solicitante);
    try {
        const solicitante = yield solicitanteRepository.findOneOrFail({ where: { id } });
        return solicitante;
    }
    catch (error) {
        throw new Error(`Solicitante con ID ${id} no encontrado`);
    }
});
// Función para manejar la solicitud HTTP para obtener un solicitante
const obtenerSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "El ID no puede ser nulo o indefinido" });
    }
    try {
        const solicitante = yield findSolicitanteById(Number(id));
        return res.json(solicitante);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.obtenerSolicitante = obtenerSolicitante;
// Función para buscar usuarios en Active Directory
function buscarUsuario(username, callback) {
    const opts = {
        filter: `(&(objectClass=user)(sAMAccountName=${username}))`,
        attributes: ["displayName", "mail"]
    };
    ad.find(opts, (err, results) => {
        if (err) {
            console.error("Error en la búsqueda:", err);
            callback(false);
            return;
        }
        if (!results || results.length === 0) {
            console.log("No se encontraron resultados");
            callback(false);
        }
        else {
            console.log("Resultados encontrados:", results);
            callback(true);
        }
    });
}
// Función para crear el usuario en Active Directory
function crearUsuarioEnAD(username, solicitanteId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Objeto que representa al usuario en Active Directory
        const user = {
            cn: username, // Common Name: Nombre común del usuario
            sn: username, // Surname: Apellido del usuario
            uid: username, // User ID: Identificador único del usuario
            mail: `${username}@uniss.edu.cu`, // Correo electrónico del usuario
            objectClass: 'user', // Clase de objeto en Active Directory, en este caso 'user'
            solicitanteId: solicitanteId.toString(), // ID del solicitante como un campo adicional en Active Directory
            userPassword: 'abcd.1234' // Contraseña por defecto
        };
        // Llamada a la función de Active Directory para agregar el usuario
        ad.addUser(user, (err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error("Error al crear el usuario en Active Directory:", err);
            }
            else {
                console.log(`Usuario creado en Active Directory con username: ${username} y solicitanteId: ${solicitanteId}`);
                // Obtener el email del responsable
                const responsableRepository = (0, typeorm_1.getRepository)(responsable_1.Responsable);
                const responsable = yield responsableRepository.findOne({ where: { id: solicitanteId } });
                if (responsable) {
                    // Enviar correo al responsable
                    const asunto = 'Nuevo Usuario Creado';
                    const texto = `Se ha creado un nuevo usuario en Active Directory con el nombre de usuario: ${username}`;
                    yield (0, mailer_1.enviarCorreo)(responsable.email, asunto, texto);
                }
                else {
                    console.error(`Responsable con ID ${solicitanteId} no encontrado`);
                }
            }
        }));
    });
}
// Función para crear un usuario en Active Directory usando datos del solicitante
const crearUsuarioDesdeSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        // Obtener datos del solicitante desde la base de datos
        const solicitante = yield findSolicitanteById(Number(id));
        const { nombre_1, nombre_2, apellido_1, apellido_2 } = solicitante;
        let username = `${nombre_1.charAt(0)}${apellido_1}`.toLowerCase();
        // Verificar si el usuario ya existe
        buscarUsuario(username, (exists) => __awaiter(void 0, void 0, void 0, function* () {
            if (exists) {
                username = `${nombre_1.charAt(0)}${apellido_2}`.toLowerCase();
                buscarUsuario(username, (exists) => __awaiter(void 0, void 0, void 0, function* () {
                    if (exists) {
                        username = `${nombre_1.charAt(0)}${apellido_1}${apellido_2}`.toLowerCase();
                        buscarUsuario(username, (exists) => __awaiter(void 0, void 0, void 0, function* () {
                            if (exists) {
                                username = `${nombre_2.charAt(0)}${apellido_1}`.toLowerCase();
                                buscarUsuario(username, (exists) => __awaiter(void 0, void 0, void 0, function* () {
                                    if (exists) {
                                        username = `${nombre_2.charAt(0)}${apellido_2}`.toLowerCase();
                                        buscarUsuario(username, (exists) => __awaiter(void 0, void 0, void 0, function* () {
                                            if (exists) {
                                                username = `${nombre_2.charAt(0)}${apellido_1}${apellido_2}`.toLowerCase();
                                                buscarUsuario(username, (exists) => __awaiter(void 0, void 0, void 0, function* () {
                                                    if (exists) {
                                                        console.error("No se pudo crear el usuario, todas las combinaciones ya existen.");
                                                        res.status(400).json({ message: "No se pudo crear el usuario, todas las combinaciones ya existen." });
                                                    }
                                                    else {
                                                        // Lógica para crear el usuario en Active Directory
                                                        yield crearUsuarioEnAD(username, solicitante.id);
                                                        res.status(200).json({ message: `Usuario creado con username: ${username}` });
                                                    }
                                                }));
                                            }
                                            else {
                                                // Lógica para crear el usuario en Active Directory
                                                yield crearUsuarioEnAD(username, solicitante.id);
                                                res.status(200).json({ message: `Usuario creado con username: ${username}` });
                                            }
                                        }));
                                    }
                                    else {
                                        // Lógica para crear el usuario en Active Directory
                                        yield crearUsuarioEnAD(username, solicitante.id);
                                        res.status(200).json({ message: `Usuario creado con username: ${username}` });
                                    }
                                }));
                            }
                            else {
                                // Lógica para crear el usuario en Active Directory
                                yield crearUsuarioEnAD(username, solicitante.id);
                                res.status(200).json({ message: `Usuario creado con username: ${username}` });
                            }
                        }));
                    }
                    else {
                        // Lógica para crear el usuario en Active Directory
                        yield crearUsuarioEnAD(username, solicitante.id);
                        res.status(200).json({ message: `Usuario creado con username: ${username}` });
                    }
                }));
            }
            else {
                // Lógica para crear el usuario en Active Directory
                yield crearUsuarioEnAD(username, solicitante.id);
                res.status(200).json({ message: `Usuario creado con username: ${username}` });
            }
        }));
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.crearUsuarioDesdeSolicitante = crearUsuarioDesdeSolicitante;
// Configuración de las rutas
router.get("/obtenerSolicitante/:id", exports.obtenerSolicitante);
router.post("/crearUsuarioDesdeSolicitante", exports.crearUsuarioDesdeSolicitante);
exports.default = router;
