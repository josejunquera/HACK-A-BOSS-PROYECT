"use strict";

const nodemailer = require("nodemailer");

const {
  HTTP_SERVER_DOMAIN,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const transporter = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: false,
});

async function sendEmailRegistration(name, email) {
  const mailData = {
    from: "info@nombreapp.com",
    to: email,
    subject: "Welcome to Car Reviews App",
    text: `Hi ${name}, you registered correctly to [nombre app]`,
    html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = sendEmailRegistration;
