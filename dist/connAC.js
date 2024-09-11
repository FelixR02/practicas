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
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuarioDesdeSolicitante = exports.buscarUsuarioEnLDAP = void 0;
const typeorm_1 = require("typeorm");
const solicitante_1 = require("./entities/solicitante");
const responsable_1 = require("./entities/responsable");
const mailer_1 = require("./mailer"); // Importa la función para enviar correos
const ldap = require('ldapjs');
// Función para establecer la conexión LDAP
const bindLDAP = (ldapClient) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        ldapClient.bind('cn=ldap_connection,cn=Users,dc=uniss,dc=edu,dc=cu', 'abcd.1234', (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Conexión exitosa con LDAP');
            }
        });
    });
});
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
// Función para buscar usuarios en LDAP
const buscarUsuario = (ldapClient, username) => {
    return new Promise((resolve, reject) => {
        const opts = {
            filter: `(uid=${username})`,
            scope: 'sub'
        };
        // Especifica la OU donde se realizará la búsqueda
        ldapClient.search('ou=UNISS_Users,dc=uniss,dc=edu,dc=cu', opts, (err, res) => {
            if (err) {
                console.error("Error en la búsqueda:", err);
                reject(false);
                return;
            }
            let userExists = false;
            res.on('searchEntry', (entry) => {
                userExists = true;
            });
            res.on('end', () => {
                resolve(userExists);
            });
        });
    });
};
// Función para buscar un usuario en LDAP usando el nombre de usuario
const buscarUsuarioEnLDAP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    // Crear el cliente LDAP solo cuando se necesita
    const ldapClient = ldap.createClient({
        url: 'ldap://10.16.1.2'
    });
    // Manejar el evento de error del cliente LDAP
    ldapClient.on('error', (err) => {
        console.error("Error al conectar con LDAP:", err);
        res.status(500).json({ message: "Conexión al LDAP perdida", error: err.message });
    });
    try {
        const userExists = yield buscarUsuario(ldapClient, username);
        if (userExists) {
            res.status(200).json({ message: `Usuario ${username} encontrado en LDAP` });
        }
        else {
            res.status(404).json({ message: `Usuario ${username} no encontrado en LDAP` });
        }
    }
    catch (error) {
        console.error("Error al buscar el usuario en LDAP:", error);
        res.status(500).json({ message: "Error al buscar el usuario en LDAP", error: error.message });
    }
});
exports.buscarUsuarioEnLDAP = buscarUsuarioEnLDAP;
// Función para crear un usuario en LDAP usando datos del solicitante
const crearUsuarioDesdeSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        // Obtener datos del solicitante desde la base de datos
        const solicitante = yield findSolicitanteById(Number(id));
        const { nombre_1, nombre_2, apellido_1, apellido_2 } = solicitante;
        // Helper function to capitalize the first letter
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        // Lista de combinaciones de nombres de usuario
        const combinaciones = [
            `${nombre_1.charAt(0).toUpperCase()}${apellido_1.toLowerCase()}`,
            `${nombre_1.charAt(0).toUpperCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.charAt(0).toUpperCase()}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toUpperCase() : ''}${apellido_1.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toUpperCase() : ''}${apellido_2.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toUpperCase() : ''}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${capitalize(apellido_1.charAt(0))}`,
            `${nombre_2 ? nombre_2.toLowerCase() : ''}${capitalize(apellido_1.charAt(0))}`,
            `${nombre_1.toLowerCase()}${capitalize(apellido_2.charAt(0))}`,
            `${nombre_2 ? nombre_2.toLowerCase() : ''}${capitalize(apellido_2.charAt(0))}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? capitalize(nombre_2.charAt(0)) : ''}${apellido_1.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? capitalize(nombre_2.charAt(0)) : ''}${apellido_2.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ''}${apellido_1.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ''}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ''}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`
        ];
        // Crear el cliente LDAP solo cuando se necesita
        const ldapClient = ldap.createClient({
            url: 'ldap://10.16.1.2'
        });
        // Manejar el evento de error del cliente LDAP
        ldapClient.on('error', (err) => {
            console.error("Error al conectar con LDAP:", err);
            res.status(500).json({ message: "Conexión al LDAP perdida", error: err.message });
        });
        // Verificar si el usuario ya existe
        let userExists = false;
        let username = '';
        for (let i = 0; i < combinaciones.length; i++) {
            username = combinaciones[i];
            if (!(yield buscarUsuario(ldapClient, username))) {
                userExists = true;
                break;
            }
        }
        // Si todas las combinaciones fallan, agregar un número al final
        if (!userExists) {
            let suffix = 1;
            while (yield buscarUsuario(ldapClient, `${username}${suffix}`)) {
                suffix++;
            }
            username = `${username}${suffix}`;
        }
        // Lógica para crear el usuario en LDAP
        try {
            yield bindLDAP(ldapClient);
        }
        catch (err) {
            console.error("Error al conectar con LDAP:", err);
            return res.status(500).json({ message: "Error al conectar con LDAP", error: err.message });
        }
        // Objeto que representa al usuario en LDAP
        const user = {
            cn: username,
            sn: username,
            uid: username,
            mail: `${username}@uniss.edu.cu`,
            objectClass: 'inetOrgPerson',
            userPassword: 'abcd.1234'
        };
        // Especifica la DN donde se creará el usuario
        // Reemplaza 'YourOU' con la OU específica donde deseas crear el usuario
        const dn = `cn=${username},ou=YourOU,dc=uniss,dc=edu,dc=cu`;
        ldapClient.add(dn, user, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error("Error al crear el usuario en LDAP:", err);
                return res.status(500).json({ message: "Error al crear el usuario en LDAP" });
            }
            else {
                console.log(`Usuario creado en LDAP con username: ${username} y solicitanteId: ${solicitante.id}`);
                // Obtener el email del responsable
                const responsableRepository = (0, typeorm_1.getRepository)(responsable_1.Responsable);
                const responsable = yield responsableRepository.findOne({ where: { id: solicitante.id } });
                if (responsable) {
                    // Enviar correo al responsable
                    const asunto = 'Nuevo Usuario Creado';
                    const texto = `Se ha creado un nuevo usuario en LDAP con el nombre de usuario: ${username}`;
                    yield (0, mailer_1.enviarCorreo)(responsable.email, asunto, texto);
                }
                else {
                    console.error(`Responsable con ID ${solicitante.id} no encontrado`);
                }
                return res.status(200).json({ message: `Usuario creado con username: ${username}` });
            }
        }));
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.crearUsuarioDesdeSolicitante = crearUsuarioDesdeSolicitante;
