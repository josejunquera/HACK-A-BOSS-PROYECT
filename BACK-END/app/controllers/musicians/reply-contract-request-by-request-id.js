"use strict";
const Joi = require("joi");
const createJsonError = require("../errors/create-json-errors");
const {
  findVenueEventIdByContractMusicianId,
  findVenueEventUserIdByVenueEventId,
} = require("../../repositories/venues-events-repository");
const { findEmailByUser } = require("../../repositories/users-repository");
const {
  findMusicianIdOfUser,
  findMusicianIdByContractId,
  insertMusicianResponseIntoContractTable,
} = require("../../repositories/musicians-repository");
const { sendEmailReplyContractRequest } = require("../../helpers/mail-smtp");

const schema = Joi.object().keys({
  idContrato: Joi.number().positive().required(),
  mensaje: Joi.string().min(10).max(500).required(),
  respuestaSolicitud: Joi.string().valid("Aceptada", "Rechazada").required(),
});

async function replyContractRequest(req, res) {
  try {
    const { idContrato, mensaje, respuestaSolicitud } = req.body;
    const { id_usuario } = req.auth;

    const venueEventId = await findVenueEventIdByContractMusicianId(idContrato);

    if (!venueEventId) {
      const error = new Error("No existen contratos con este ID ");
      error.status = 400;
      throw error;
    }

    const venueEventUserId = await findVenueEventUserIdByVenueEventId(
      venueEventId.id_local_evento
    );

    const venueEventEmail = await findEmailByUser(venueEventUserId.id_usuario);

    const musicianId = await findMusicianIdOfUser(id_usuario);

    const existMusicianId = await findMusicianIdByContractId(idContrato);

    if (existMusicianId[0].id_solista !== musicianId.id_solista) {
      const error = new Error(
        "El contrato indicado no está asociado a ese músico"
      );
      error.status = 400;
      throw error;
    }

    await insertMusicianResponseIntoContractTable(
      respuestaSolicitud,
      idContrato
    );

    await sendEmailReplyContractRequest(
      venueEventEmail[0].email,
      mensaje,
      respuestaSolicitud
    );

    res.send({ message: "Tu mensaje ha sido enviado" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = replyContractRequest;
