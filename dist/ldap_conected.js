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
exports.LDAPConnection = void 0;
const ldap = require('ldapjs');
// Función para establecer la conexión LDAP
const LDAPConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const bindAsync = (client, username, password) => {
            return new Promise((resolve, reject) => {
                client.bind(username, password, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve('Conexión exitosa con LDAP');
                    }
                });
            });
        };
        // Intento de autenticación con las credenciales proporcionadas
        yield bindAsync(ldapClient, username, password);
        console.log('Conexión exitosa con LDAP');
        res.status(200).send('Conexión exitosa con LDAP');
    }
    catch (error) {
        console.error('Error al conectar con LDAP:', error);
        res.status(500).json({ message: 'Error al conectar con LDAP', error: error.message });
    }
});
exports.LDAPConnection = LDAPConnection;
