// Importación de módulos necesarios
import express, { Request, Response } from 'express';
const ldap = require('ldapjs');

// Función para establecer la conexión LDAP
export const LDAPConnection = async (req: Request, res: Response) => {
  try {
    // Creación del cliente LDAP
    const ldapClient = ldap.createClient({
      url: 'ldap://10.16.1.2',
      baseDN: 'cn=ldap_connection,cn=Users,dc=uniss,dc=edu,dc=cu',
      password: 'abcd.1234'
    });

    // Obtención de credenciales de usuario desde la solicitud
    const username = 'futrera@uniss.edu.cu';
    const password = 'Qpmzwon3*';

    // Promisify ldapClient.bind to use async/await
    const bindAsync = (client: any, username: string, password: string) => {
      return new Promise((resolve, reject) => {
        client.bind(username, password, (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve('Conexión exitosa con LDAP');
          }
        });
      });
    };

    // Intento de autenticación con las credenciales proporcionadas
    await bindAsync(ldapClient, username, password);
    console.log('Conexión exitosa con LDAP');
    res.status(200).send('Conexión exitosa con LDAP');
  } catch (error: any) {
    console.error('Error al conectar con LDAP:', error);
    res.status(500).json({ message: 'Error al conectar con LDAP', error: error.message });
  }
};