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
exports.crearUsuarioDesdeSolicitante = exports.buscarUsuarioEnLDAP = exports.findSolicitanteById = void 0;
const solicitante_1 = require("./entities/solicitante");
const responsable_1 = require("./entities/responsable");
const mailer_1 = require("./mailer"); // Importa la función para enviar correos
const db_1 = require("./db");
const ldap = require("ldapjs");
// Función para establecer la conexión LDAP
const connectLDAP = () => __awaiter(void 0, void 0, void 0, function* () {
    const ldapClient = ldap.createClient({
        url: "ldap://10.16.1.2",
        baseDN: "cn=ldap_connection,cn=Users,dc=uniss,dc=edu,dc=cu",
        password: "abcd.1234",
    });
    return new Promise((resolve, reject) => {
        ldapClient.bind("cn=ldap_connection,cn=Users,dc=uniss,dc=edu,dc=cu", "abcd.1234", (err) => {
            if (err) {
                console.error("Error en bind:", err);
                reject(err);
            }
            else {
                console.log("Conexión exitosa con LDAP");
                resolve(ldapClient);
            }
        });
    });
});
// Función para obtener un solicitante desde la base de datos
const findSolicitanteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitante = yield solicitante_1.Solicitante.findOneBy({ id });
        return solicitante;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        return null;
    }
});
exports.findSolicitanteById = findSolicitanteById;
// Función para buscar usuarios en LDAP
const buscarUsuario = (ldapClient, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opts = {
            filter: `(uid=${username})`,
            scope: "sub"
        };
        const baseDN = "ou=Estudiantes,ou=Pruebas_informatizacion,ou=UNISS_Users,dc=uniss,dc=edu,dc=cu"; // Asegúrate de que esta DN es correcta
        return yield new Promise((resolve, reject) => {
            ldapClient.search(baseDN, opts, (err, res) => {
                if (err) {
                    console.error("Error en la búsqueda:", err);
                    reject(new Error(`Error en la búsqueda: ${err.message}`));
                    return;
                }
                let userExists = false;
                res.on("searchEntry", (entry) => {
                    userExists = true;
                });
                res.on("error", (err) => {
                    console.error("Error durante la búsqueda:", err);
                    reject(new Error(`Error durante la búsqueda: ${err.message}`));
                });
                res.on("end", (result) => {
                    if (result.status !== 0) {
                        console.error("Error en el resultado de la búsqueda:", result);
                        reject(new Error(`Error en el resultado de la búsqueda: ${result.status}`));
                    }
                    else {
                        resolve(userExists);
                    }
                });
            });
        });
    }
    catch (error) {
        console.error("Error en buscarUsuario:", error);
        throw new Error(`Error en buscarUsuario: ${error.message}`);
    }
});
// Función para buscar un usuario en LDAP usando el nombre de usuario
const buscarUsuarioEnLDAP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const ldapClient = yield connectLDAP();
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
        finally {
            // Cerrar la conexión con el servidor LDAP
            ldapClient.unbind();
        }
    }
    catch (error) {
        console.error("Error al conectar con LDAP:", error);
        res.status(500).json({ message: "Error al conectar con LDAP", error: error.message });
    }
});
exports.buscarUsuarioEnLDAP = buscarUsuarioEnLDAP;
// Función para crear un usuario en LDAP usando datos del solicitante
const crearUsuarioDesdeSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        // Obtener datos del solicitante desde la base de datos usando findSolicitanteById
        const solicitante = yield (0, exports.findSolicitanteById)(Number(id));
        if (!solicitante) {
            return res.status(404).json({ message: `Solicitante con ID ${id} no encontrado` });
        }
        const { nombre_1, nombre_2, apellido_1, apellido_2 } = solicitante;
        // Helper function to capitalize the first letter
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        // Lista de combinaciones de nombres de usuario
        const combinaciones = [
            `${nombre_1.charAt(0).toUpperCase()}${apellido_1.toLowerCase()}`,
            `${nombre_1.charAt(0).toUpperCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.charAt(0).toUpperCase()}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toUpperCase() : ""}${apellido_1.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toUpperCase() : ""}${apellido_2.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toUpperCase() : ""}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${capitalize(apellido_1.charAt(0))}`,
            `${nombre_2 ? nombre_2.toLowerCase() : ""}${capitalize(apellido_1.charAt(0))}`,
            `${nombre_1.toLowerCase()}${capitalize(apellido_2.charAt(0))}`,
            `${nombre_2 ? nombre_2.toLowerCase() : ""}${capitalize(apellido_2.charAt(0))}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? capitalize(nombre_2.charAt(0)) : ""}${apellido_1.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? capitalize(nombre_2.charAt(0)) : ""}${apellido_2.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ""}${apellido_1.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ""}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ""}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
        ];
        const ldapClient = yield connectLDAP();
        // Verificar si el usuario ya existe
        let userExists = false;
        let username = "";
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
        // Validar que el username no contenga caracteres no válidos
        const invalidChars = /[,=+<>#;\\"]/;
        if (invalidChars.test(username)) {
            throw new Error(`El nombre de usuario contiene caracteres no válidos: ${username}`);
        }
        // Construir el campo cn
        const cn = `${nombre_1} ${nombre_2 ? nombre_2 + " " : ""}${apellido_1} ${apellido_2}`;
        // Validar que el cn no contenga caracteres no válidos
        if (invalidChars.test(cn)) {
            throw new Error(`El valor de cn contiene caracteres no válidos: ${cn}`);
        }
        // Objeto que representa al usuario en LDAP
        const user = {
            cn: cn,
            givenName: nombre_1,
            sn: apellido_1 + " " + apellido_2,
            uid: username,
            displayName: nombre_1,
            title: "estudiante",
            l: "Sancti Spiritus",
            postalCode: "50100",
            mail: `${username}@uniss.edu.cu`,
            objectClass: "inetOrgPerson",
            userPassword: "abcd.1234",
            employeeNumber: "123456",
        };
        // Especifica la DN donde se creará el usuario
        const dn = `cn=${cn},ou=Estudiantes,ou=Pruebas_crear_usuarios,dc=uniss,dc=edu,dc=cu`;
        ldapClient.add(dn, user, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                if (err.name === 'EntryAlreadyExistsError') {
                    console.error("Error al crear el usuario en LDAP: El usuario ya existe.");
                    return res.status(409).json({ message: "Error al crear el usuario en LDAP: El usuario ya existe." });
                }
                else {
                    console.error("Error al crear el usuario en LDAP:", err);
                    return res.status(500).json({ message: "Error al crear el usuario en LDAP", error: err.message });
                }
            }
            else {
                console.log(`Usuario creado en LDAP con username: ${username} y solicitanteId: ${solicitante.id}`);
                // Obtener el email del responsable
                const responsableRepository = db_1.AppDataSource.getRepository(responsable_1.Responsable);
                const responsable = yield responsableRepository.findOne({ where: { id: solicitante.id } });
                if (responsable) {
                    // Enviar correo al responsable
                    const asunto = "Nuevo Usuario Creado";
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
