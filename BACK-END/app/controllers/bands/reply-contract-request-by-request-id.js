"use strict";
const Joi = require("joi");
const createJsonError = require("../errors/create-json-errors");
const {
  findVenueEventIdByContractId,
  findVenueEventUserIdByVenueEventId,
} = require("../../repositories/venues-events-repository");
const { findEmailByUser } = require("../../repositories/users-repository");

const schema = Joi.object().keys({
  idContrato: Joi.number().positive().required(),
  mensaje: Joi.string().min(10).max(500).required(),
  respuestaSolicitud: Joi.string().valid("Aceptada", "Rechazada").required(),
});

async function replyContractRequest(req, res) {
  try {
    const { idContrato, mensaje, respuestaSolicitud } = req.body;
    const { id_usuario } = req.auth;

    const venueEventId = await findVenueEventIdByContractId(idContrato);
    console.log(venueEventId.id_local_evento);

    const venueEventUserId = await findVenueEventUserIdByVenueEventId(
      venueEventId.id_local_evento
    );
    console.log(venueEventUserId.id_usuario);

    const venueEventEmail = await findEmailByUser(venueEventUserId.id_usuario);
    console.log(venueEventEmail[0].email);

    res.send("Hola");
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = replyContractRequest;
