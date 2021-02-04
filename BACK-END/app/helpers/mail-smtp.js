"use strict";

const nodemailer = require("nodemailer");

const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendEmailRegistration(name, email) {
  const mailData = {
    from: "info@nombreapp.com",
    to: email,
    subject: "Welcome to Car Reviews App",
    text: `Hi ${name}, you registered correctly to [nombre app]`,
    // html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailBandToMusician(bandName, email, message) {
  const mailData = {
    from: `${bandName}`,
    to: email,
    subject: "Solicitud para tocar en nuestra banda",
    text: `${message}`,
    // html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = { sendEmailRegistration, sendEmailBandToMusician };
