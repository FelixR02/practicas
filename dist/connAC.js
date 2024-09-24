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
exports.crearUsuarioDesdeSolicitante = exports.findSolicitanteById = void 0;
const solicitud_1 = require("./entities/solicitud");
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
        const solicitud = yield solicitud_1.Solicitud.findOneBy({ id });
        return solicitud;
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
const buscarUsuario = (ldapClient, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opts = {
            filter: `(cn=${fullName})`, // Cambiado de uid a cn para buscar por nombre completo
            scope: "sub",
        };
        const baseDN = "ou=Estudiantes,ou=Pruebas_crear_usuarios,dc=uniss,dc=edu,dc=cu"; // Asegúrate de que esta DN es correcta
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
// Función para crear un usuario en LDAP usando datos del solicitante
const crearUsuarioDesdeSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, tipoUsuario } = req.body; // tipoUsuario puede ser "estudiante" o "trabajador"
    try {
        const solicitud = yield (0, exports.findSolicitanteById)(Number(id));
        if (!solicitud) {
            return res.status(404).json({ message: `Solicitud con ID ${id} no encontrado` });
        }
        const { nombre_1, nombre_2, apellido_1, apellido_2 } = solicitud;
        const fullName = `${nombre_1} ${nombre_2 ? nombre_2 + " " : ""}${apellido_1} ${apellido_2}`;
        const combinaciones = [
            `${nombre_1.charAt(0).toLowerCase()}${apellido_1.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toLowerCase() : ""}${apellido_1.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toLowerCase() : ""}${apellido_2.toLowerCase()}`,
            `${nombre_2 ? nombre_2.charAt(0).toLowerCase() : ""}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${apellido_1.charAt(0).toLowerCase()}`,
            `${nombre_2 ? nombre_2.toLowerCase() : ""}${apellido_1.charAt(0).toLowerCase()}`,
            `${nombre_1.toLowerCase()}${apellido_2.charAt(0).toLowerCase()}`,
            `${nombre_2 ? nombre_2.toLowerCase() : ""}${apellido_2.charAt(0).toLowerCase()}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? nombre_2.charAt(0).toLowerCase() : ""}${apellido_1.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${nombre_2 ? nombre_2.charAt(0).toLowerCase() : ""}${apellido_2.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ""}${apellido_1.toLowerCase()}`,
            `${nombre_1.charAt(0).toLowerCase()}${nombre_2 ? nombre_2.toLowerCase() : ""}${apellido_2.toLowerCase()}`,
            `${nombre_1.toLowerCase()}${apellido_1.toLowerCase()}${apellido_2.toLowerCase()}`,
        ];
        const ldapClient = yield connectLDAP();
        let userExists = false;
        let username = "";
        for (let i = 0; i < combinaciones.length; i++) {
            username = combinaciones[i];
            if (!(yield buscarUsuario(ldapClient, fullName))) { // Pasar el nombre completo
                userExists = true;
                break;
            }
        }
        if (!userExists) {
            let suffix = 1;
            while (yield buscarUsuario(ldapClient, `${username}${suffix}`)) {
                suffix++;
            }
            username = `${username}${suffix}`;
        }
        const invalidChars = /[,\=\+<>#;\\"]/;
        if (invalidChars.test(username)) {
            throw new Error(`El nombre de usuario contiene caracteres no válidos: ${username}`);
        }
        const cn = `${nombre_1} ${nombre_2 ? nombre_2 + " " : ""}${apellido_1} ${apellido_2}`;
        let title = "";
        let ou = "";
        switch (tipoUsuario) {
            case 1:
                title = "Estudiante";
                ou = "Estudiantes";
                break;
            case 2:
                title = "Docente";
                ou = "Trabajadores";
                break;
            case 3:
                title = "No Docente";
                ou = "Trabajadores";
                break;
            default:
                throw new Error("Tipo de usuario no válido");
        }
        const user = {
            cn: cn /*  */,
            givenName: nombre_1 /*  */,
            sn: apellido_1 + " " + apellido_2,
            uid: username /*  */,
            displayName: nombre_1 /* nombre que muestra al usuario */,
            title: "estudiante" /* rol */,
            l: "Sancti Spiritus", // Ciudad o localidad
            st: "Sancti Spiritus", // provincia
            c: "Cuba", // pais
            postalCode: "50100",
            /* mail: `${username}@uniss.edu.cu`, */
            objectClass: "inetOrgPerson",
            userPassword: "abcd.1234",
            employeeNumber: "123456", // Usando employeeNumber para almacenar el PIN
            sAMAccountName: username,
            /* accountExpires: Fecha y hora en que expira la cuenta.
            lastLogon: Fecha y hora del último inicio de sesión.
            pwdLastSet: Fecha y hora en que se estableció la contraseña por última vez.
            sAMAccountName: Nombre de cuenta de inicio de sesión.
            userAccountControl: Control de la cuenta del usuario (estado de la cuenta, etc.)
            nota usar campo manager, para almacenar profesor guia y este mostrara horarios a los estudiantes en el futuro */
        };
        const dn = `cn=${cn},ou=${ou},ou=Pruebas_crear_usuarios,dc=uniss,dc=edu,dc=cu`;
        ldapClient.add(dn, user, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                if (err.name === 'EntryAlreadyExistsError') {
                    console.error("Error al crear el usuario en LDAP:", err);
                    return res.status(409).json({ message: `El usuario con el nombre completo ${fullName} ya existe` });
                }
                else {
                    console.error("Error al crear el usuario en LDAP:", err);
                    return res.status(500).json({ message: "Error al crear el usuario en LDAP" });
                }
            }
            else {
                console.log(`Usuario creado en LDAP con username: ${username} y solicitanteId: ${solicitud.id}`);
                const responsableRepository = db_1.AppDataSource.getRepository(responsable_1.Responsable);
                const responsable = yield responsableRepository.findOne({
                    where: { id: solicitud.id },
                });
                if (responsable) {
                    const asunto = "Nuevo Usuario Creado";
                    const texto = `Se ha creado un nuevo usuario en LDAP con el nombre de usuario: ${username}`;
                    yield (0, mailer_1.enviarCorreo)(responsable.email, asunto, texto);
                }
                else {
                    console.error(`Responsable con ID ${solicitud.id} no encontrado`);
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
