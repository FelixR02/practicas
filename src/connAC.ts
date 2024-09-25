import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Solicitud } from "./entities/solicitud";
import { Responsable } from "./entities/responsable";
import { enviarCorreo } from "./mailer"; // Importa la función para enviar correos
import { AppDataSource } from "./db";
const ldap = require("ldapjs");

// Función para establecer la conexión LDAP
const connectLDAP = async () => {
  const ldapClient = ldap.createClient({
    url: "ldap://10.16.1.2",
    baseDN: "cn=ldap_connection,cn=Users,dc=uniss,dc=edu,dc=cu",
    password: "abcd.1234",
  });

  return new Promise((resolve, reject) => {
    ldapClient.bind(
      "cn=ldap_connection,cn=Users,dc=uniss,dc=edu,dc=cu",
      "abcd.1234",
      (err: any) => {
        if (err) {
          console.error("Error en bind:", err);
          reject(err);
        } else {
          console.log("Conexión exitosa con LDAP");
          resolve(ldapClient);
        }
      }
    );
  });
};

// Función para obtener un solicitante desde la base de datos
// Función para obtener un solicitante desde la base de datos
export const findSolicitanteById = async (id: number): Promise<Solicitud | null> => {
  try {
    const solicitud = await Solicitud.findOne({
      where: { id },
      relations: ["categoria"], // Cargar la relación con Categoria
    });
    return solicitud;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};

// Función para buscar usuarios en LDAP
const buscarUsuario = async (ldapClient: any, fullName: string): Promise<boolean> => {
  try {
    const opts = {
      filter: `(cn=${fullName})`, // Cambiado de uid a cn para buscar por nombre completo
      scope: "sub",
    };
    const baseDN = "ou=Estudiantes,ou=Pruebas_crear_usuarios,dc=uniss,dc=edu,dc=cu"; // Asegúrate de que esta DN es correcta

    return await new Promise((resolve, reject) => {
      ldapClient.search(baseDN, opts, (err: any, res: any) => {
        if (err) {
          console.error("Error en la búsqueda:", err);
          reject(new Error(`Error en la búsqueda: ${err.message}`));
          return;
        }

        let userExists = false;
        res.on("searchEntry", (entry: any) => {
          userExists = true;
        });
        res.on("error", (err: any) => {
          console.error("Error durante la búsqueda:", err);
          reject(new Error(`Error durante la búsqueda: ${err.message}`));
        });
        res.on("end", (result: any) => {
          if (result.status !== 0) {
            console.error("Error en el resultado de la búsqueda:", result);
            reject(new Error(`Error en el resultado de la búsqueda: ${result.status}`));
          } else {
            resolve(userExists);
          }
        });
      });
    });
  } catch (error: any) {
    console.error("Error en buscarUsuario:", error);
    throw new Error(`Error en buscarUsuario: ${error.message}`);
  }
};

// Función para crear un usuario en LDAP usando datos del solicitante
export const crearUsuarioDesdeSolicitante = async (req: Request, res: Response) => {
  const { id } = req.body; // tipoUsuario puede ser "estudiante" o "trabajador"
  try {
    const solicitud = await findSolicitanteById(Number(id));
    if (!solicitud) {
      return res.status(404).json({ message: `Solicitud con ID ${id} no encontrado` });
    }

    const { nombre_1, nombre_2, apellido_1, apellido_2, categoria } = solicitud;
    if (!categoria || !categoria.id) {
      return res.status(400).json({ message: "Categoría de la solicitud no válida o no definida" });
    }

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

    const ldapClient: any = await connectLDAP();
    let userExists = false;
    let username = "";

    for (let i = 0; i < combinaciones.length; i++) {
      username = combinaciones[i];
      if (!(await buscarUsuario(ldapClient, fullName))) { // Pasar el nombre completo
        userExists = true;
        break;
      }
    }

    if (!userExists) {
      let suffix = 1;
      while (await buscarUsuario(ldapClient, `${username}${suffix}`)) {
        suffix++;
      }
      username = `${username}${suffix}`;
    }

    const invalidChars = /[,=+<>#;\\"]/;
    if (invalidChars.test(username)) {
      throw new Error(`El nombre de usuario contiene caracteres no válidos: ${username}`);
    }

    const cn = `${nombre_1} ${nombre_2 ? nombre_2 + " " : ""}${apellido_1} ${apellido_2}`;
    let title = "";
    let ou = "";

    switch (categoria.id) {
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
      title: title /* rol */,
      l: "Sancti Spiritus" /*lugar de origen  */,
      postalCode: "50100",
      /* mail: `${username}@uniss.edu.cu`, */
      objectClass: "inetOrgPerson",
      userPassword: "abcd.1234",
      employeeNumber: "123456",// Usando employeeNumber para almacenar el PIN
      sAMAccountName: username, 
      /* accountExpires: Fecha y hora en que expira la cuenta.
      lastLogon: Fecha y hora del último inicio de sesión.
      pwdLastSet: Fecha y hora en que se estableció la contraseña por última vez.
      sAMAccountName: Nombre de cuenta de inicio de sesión.
      userAccountControl: Control de la cuenta del usuario (estado de la cuenta, etc.)
      nota usar campo manager, para almacenar profesor guia y este mostrara horarios a los estudiantes en el futuro */
    };

    const dn = `cn=${cn},ou=${ou},ou=Pruebas_crear_usuarios,dc=uniss,dc=edu,dc=cu`;

    ldapClient.add(dn, user, async (err: any) => {
      if (err) {
        if (err.name === 'EntryAlreadyExistsError') {
          console.error("Error al crear el usuario en LDAP:", err);
          return res.status(409).json({ message: `El usuario con el nombre completo ${fullName} ya existe` });
        } else {
          console.error("Error al crear el usuario en LDAP:", err);
          return res.status(500).json({ message: "Error al crear el usuario en LDAP" });
        }
      } else {
        console.log(`Usuario creado en LDAP con username: ${username} y solicitanteId: ${solicitud.id}`);

        const responsableRepository = AppDataSource.getRepository(Responsable);
        const responsable = await responsableRepository.findOne({ where: { id: solicitud.id } });

        if (responsable) {
          const asunto = "Nuevo Usuario Creado";
          const texto = `Se ha creado un nuevo usuario en LDAP con el nombre de usuario: ${username}`;
          await enviarCorreo(responsable.email, asunto, texto);
        } else {
          console.error(`Responsable con ID ${solicitud.id} no encontrado`);
        }

        return res.status(200).json({ message: `Usuario creado con username: ${username}` });
      }
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};