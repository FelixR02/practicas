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
exports.enviarCorreo = enviarCorreo;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Configuración del transportador de nodemailer para usar el servidor SMTP de tu universidad
const transporter = nodemailer_1.default.createTransport({
    host: 'uniss.edu.cu', // Cambia esto por la dirección del servidor SMTP de tu universidad
    port: 587, // Cambia esto por el puerto que utiliza tu servidor SMTP (por ejemplo, 465 para SSL, 587 para TLS)
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER, // Cambia esto por tu email de la universidad
        pass: process.env.EMAIL_PASS // Cambia esto por tu contraseña de la universidad
    }
});
// Función para enviar un correo electrónico
function enviarCorreo(destinatario, asunto, texto) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: 'futrera@uniss.edu.cu', // Cambia esto por tu email de la universidad
            to: destinatario,
            subject: asunto,
            text: "La cuenta que solicitó ha sido creada"
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log('Correo enviado exitosamente');
        }
        catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    });
}
