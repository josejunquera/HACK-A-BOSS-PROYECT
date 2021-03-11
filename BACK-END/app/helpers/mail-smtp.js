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

async function sendEmailBandToMusician(musicianEmail, bandEmail, message) {
  const mailData = {
    from: "musicapphab@gmail.com",
    to: musicianEmail,
    subject: "Solicitud para tocar en nuestra banda",
    text: `${message};puedes contestar a esta solicitud escribiéndonos a nuestro mail ${bandEmail}`,
    // html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailMusicianToBand(bandEmail, musicianEmail, message) {
  const mailData = {
    from: "musicapphab@gmail.com",
    to: bandEmail,
    subject: "Solicitud para tocar con vuestra banda",
    text: `${message};puedes contestar a esta solicitud escribiéndome a mi mail ${musicianEmail}`,
    // html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailVenueEventToBand(
  bandEmail,
  venueEventEmail,
  contract,
  venueEventName
) {
  const mailData = {
    from: "musicapphab@gmail.com",
    to: bandEmail,
    subject: "Solicitud para tocar en nuestro local evento banda",
    text: `Soy ${venueEventName}. ${contract};puedes contestar a esta solicitud escribiéndome a mi mail ${venueEventEmail}`,
    // html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailVenueEventToMusician(
  musicianEmail,
  venueEventEmail,
  contract
) {
  const mailData = {
    from: "musicapphab@gmail.com",
    to: musicianEmail,
    subject: "Solicitud para tocar en nuestro local evento banda",
    text: `Soy ${venueEventname}, ${contract};puedes contestar a esta solicitud escribiéndome a mi mail ${venueEventEmail}`,
    // html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendEmailReplyContractRequest(
  venueEventEmail,
  message,
  responseToContract
) {
  const mailData = {
    from: "musicapphab@gmail.com",
    to: venueEventEmail,
    subject: "Respuesta a su solicitud de contrato",
    text: `Su solicitud de contratación ha sido ${responseToContract}. ${message}`,
    // html: `<a>Hi ${name}, you registered correctly to [nombre app]</a>`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = {
  sendEmailRegistration,
  sendEmailBandToMusician,
  sendEmailMusicianToBand,
  sendEmailVenueEventToBand,
  sendEmailVenueEventToMusician,
  sendEmailReplyContractRequest,
};
