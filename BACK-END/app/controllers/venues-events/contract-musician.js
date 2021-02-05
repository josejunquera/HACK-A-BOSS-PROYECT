"use strict";

const { func } = require("joi");
const Joi = require("joi");
const {
  insertVenueAndMusicianIntoContractTable,
} = require("../../repositories/venues-events-repository");
const { findEmailByUser } = require("../../repositories/users-repository");
const {
  findUserIdOfMusicianByName,
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");

const {
  findVenueEventIdOfUser,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");
const { sendEmailVenueEventToBand } = require("../../helpers/mail-smtp");

const schema = Joi.object().keys({
  nombreSolista: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "]{3,25}$/)
    .required(),
  contrato: Joi.string().min(10).max(500).required(),
});

async function contractMusician(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { contrato } = req.body;
    const { nombreSolista } = req.body;

    await schema.validateAsync(req.body);

    const venueEventEmail = await findEmailByUser(id_usuario);

    const musicianUserId = await findUserIdOfMusicianByName(nombreSolista);

    if (!musicianUserId[0]) {
      const error = new Error("El solista al que intentas contratar no existe");
      error.status = 400;
      throw error;
    }

    const musicianEmail = await findEmailByUser(musicianUserId[0].id_usuario);

    const musicianId = await findMusicianIdOfUser(musicianUserId[0].id_usuario);

    const venueEventId = await findVenueEventIdOfUser(id_usuario);

    // const fecha = Date.now();

    const fecha = new Date().toISOString().slice(0, 10);

    console.log(fecha);

    await insertVenueAndMusicianIntoContractTable(
      musicianId.id_solista,
      venueEventId.id_local_evento,
      fecha,
      contrato
    );

    await sendEmailVenueEventToBand(
      musicianEmail[0].email,
      venueEventEmail[0].email,
      contrato
    );

    res.send({ message: "Tu mensaje ha sido enviado" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = contractMusician;
