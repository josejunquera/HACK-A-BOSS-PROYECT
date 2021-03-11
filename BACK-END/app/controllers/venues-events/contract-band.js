"use strict";

const { func } = require("joi");
const Joi = require("joi");
const {
  insertVenueAndBandIntoContractTable,
} = require("../../repositories/venues-events-repository");
const { findEmailByUser } = require("../../repositories/users-repository");
const {
  findUserIdOfBandByName,
  findBandIdOfUser,
} = require("../../repositories/bands-repository");

const {
  findVenueEventIdOfUser,
  findVenueEventNameById,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");
const { sendEmailVenueEventToBand } = require("../../helpers/mail-smtp");

const schema = Joi.object().keys({
  nombreBanda: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  contrato: Joi.string().min(10).max(500).required(),
});

async function contractBand(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { contrato } = req.body;
    const { nombreBanda } = req.body;

    await schema.validateAsync(req.body);

    const venueEventEmail = await findEmailByUser(id_usuario);

    const bandUserId = await findUserIdOfBandByName(nombreBanda);

    if (!bandUserId[0]) {
      const error = new Error("La banda a la que intentas contratar no existe");
      error.status = 400;
      throw error;
    }

    const bandEmail = await findEmailByUser(bandUserId[0].id_usuario);

    const bandId = await findBandIdOfUser(bandUserId[0].id_usuario);

    const venueEventId = await findVenueEventIdOfUser(id_usuario);

    const venueEventName = await findVenueEventNameById(
      venueEventId.id_local_evento
    );

    const fecha = new Date().toISOString().slice(0, 10);

    await insertVenueAndBandIntoContractTable(
      bandId.id_banda,
      venueEventId.id_local_evento,
      fecha,
      contrato,
      venueEventName.nombre_local_evento,
      nombreBanda
    );

    await sendEmailVenueEventToBand(
      bandEmail[0].email,
      venueEventEmail[0].email,
      contrato,
      venueEventName.nombre_local_evento
    );

    res.send({ message: "Tu mensaje ha sido enviado" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = contractBand;
