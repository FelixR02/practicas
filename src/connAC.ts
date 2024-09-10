import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Solicitante } from './entities/solicitante';
import { Responsable } from './entities/responsable';
import { enviarCorreo } from './mailer'; // Importa la función para enviar correos
const ActiveDirectory = require('activedirectory2');

const router = express.Router();

// Configuración de Active Directory
const config = {
    url: 'ldap://uniss.edu.cu',
    baseDN: 'cn=ldap_connection, cn=Users,dc=uniss,dc=edu,dc=cu',
    username: 'futrera@uniss.edu.cu',
    password: 'Qpmzwon3*'
};

const ad = new ActiveDirectory(config);

// Función para obtener un solicitante desde la base de datos
const findSolicitanteById = async (id: number): Promise<Solicitante> => {
    const solicitanteRepository = getRepository(Solicitante);
    try {
        const solicitante = await solicitanteRepository.findOneOrFail({ where: { id } });
        return solicitante;
    } catch (error) {
        throw new Error(`Solicitante con ID ${id} no encontrado`);
    }
};

// Función para manejar la solicitud HTTP para obtener un solicitante
export const obtenerSolicitante = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "El ID no puede ser nulo o indefinido" });
    }

    try {
        const solicitante = await findSolicitanteById(Number(id));
        return res.json(solicitante);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

// Función para buscar usuarios en Active Directory
function buscarUsuario(username: any, callback: (exists: boolean) => void) {
    const opts = {
        filter: `(&(objectClass=user)(sAMAccountName=${username}))`,
        attributes: ["displayName", "mail"]
    };
    ad.find(opts, (err: any, results: any) => {
        if (err) {
            console.error("Error en la búsqueda:", err);
            callback(false);
            return;
        }
        if (!results || results.length === 0) {
            console.log("No se encontraron resultados");
            callback(false);
        } else {
            console.log("Resultados encontrados:", results);
            callback(true);
        }
    });
}

// Función para crear el usuario en Active Directory
async function crearUsuarioEnAD(username: string, solicitanteId: number) {
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
    ad.addUser(user, async (err: any) => {
        if (err) {
            console.error("Error al crear el usuario en Active Directory:", err);
        } else {
            console.log(`Usuario creado en Active Directory con username: ${username} y solicitanteId: ${solicitanteId}`);

            // Obtener el email del responsable
            const responsableRepository = getRepository(Responsable);
            const responsable = await responsableRepository.findOne({ where: { id: solicitanteId } });

            if (responsable) {
                // Enviar correo al responsable
                const asunto = 'Nuevo Usuario Creado';
                const texto = `Se ha creado un nuevo usuario en Active Directory con el nombre de usuario: ${username}`;
                await enviarCorreo(responsable.email, asunto, texto);
            } else {
                console.error(`Responsable con ID ${solicitanteId} no encontrado`);
            }
        }
    });
}

// Función para crear un usuario en Active Directory usando datos del solicitante
export const crearUsuarioDesdeSolicitante = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
        // Obtener datos del solicitante desde la base de datos
        const solicitante = await findSolicitanteById(Number(id));
        const { nombre_1, nombre_2, apellido_1, apellido_2 } = solicitante;
        let username = `${nombre_1.charAt(0)}${apellido_1}`.toLowerCase();

        // Verificar si el usuario ya existe
        buscarUsuario(username, async (exists) => {
            if (exists) {
                username = `${nombre_1.charAt(0)}${apellido_2}`.toLowerCase();
                buscarUsuario(username, async (exists) => {
                    if (exists) {
                        username = `${nombre_1.charAt(0)}${apellido_1}${apellido_2}`.toLowerCase();
                        buscarUsuario(username, async (exists) => {
                            if (exists) {
                                username = `${nombre_2.charAt(0)}${apellido_1}`.toLowerCase();
                                buscarUsuario(username, async (exists) => {
                                    if (exists) {
                                        username = `${nombre_2.charAt(0)}${apellido_2}`.toLowerCase();
                                        buscarUsuario(username, async (exists) => {
                                            if (exists) {
                                                username = `${nombre_2.charAt(0)}${apellido_1}${apellido_2}`.toLowerCase();
                                                buscarUsuario(username, async (exists) => {
                                                    if (exists) {
                                                        console.error("No se pudo crear el usuario, todas las combinaciones ya existen.");
                                                        res.status(400).json({ message: "No se pudo crear el usuario, todas las combinaciones ya existen." });
                                                    } else {
                                                        // Lógica para crear el usuario en Active Directory
                                                        await crearUsuarioEnAD(username, solicitante.id);
                                                        res.status(200).json({ message: `Usuario creado con username: ${username}` });
                                                    }
                                                });
                                            } else {
                                                // Lógica para crear el usuario en Active Directory
                                                await crearUsuarioEnAD(username, solicitante.id);
                                                res.status(200).json({ message: `Usuario creado con username: ${username}` });
                                            }
                                        });
                                    } else {
                                        // Lógica para crear el usuario en Active Directory
                                        await crearUsuarioEnAD(username, solicitante.id);
                                        res.status(200).json({ message: `Usuario creado con username: ${username}` });
                                    }
                                });
                            } else {
                                // Lógica para crear el usuario en Active Directory
                                await crearUsuarioEnAD(username, solicitante.id);
                                res.status(200).json({ message: `Usuario creado con username: ${username}` });
                            }
                        });
                    } else {
                        // Lógica para crear el usuario en Active Directory
                        await crearUsuarioEnAD(username, solicitante.id);
                        res.status(200).json({ message: `Usuario creado con username: ${username}` });
                    }
                });
            } else {
                // Lógica para crear el usuario en Active Directory
                await crearUsuarioEnAD(username, solicitante.id);
                res.status(200).json({ message: `Usuario creado con username: ${username}` });
            }
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};


export default router;