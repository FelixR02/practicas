import nodemailer from 'nodemailer';

// Configuración del transportador de nodemailer para usar el servidor SMTP de tu universidad
const transporter = nodemailer.createTransport({
  host: 'uniss.edu.cu', // Cambia esto por la dirección del servidor SMTP de tu universidad
  port: 587, // Cambia esto por el puerto que utiliza tu servidor SMTP (por ejemplo, 465 para SSL, 587 para TLS)
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER, // Cambia esto por tu email de la universidad
    pass: process.env.EMAIL_PASS // Cambia esto por tu contraseña de la universidad
  }
});

// Función para enviar un correo electrónico
export async function enviarCorreo(destinatario: string, asunto: string, texto: string) {
  const mailOptions = {
    from: 'futrera@uniss.edu.cu', // Cambia esto por tu email de la universidad
    to: destinatario,
    subject: asunto,
    text: "La cuenta que solicitó ha sido creada"
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}