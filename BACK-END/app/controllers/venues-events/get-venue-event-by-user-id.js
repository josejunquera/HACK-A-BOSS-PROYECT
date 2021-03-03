"use strict";

const Joi = require("joi");
const {
  findVenueEventByUserId,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");

async function getVenueEventByUserId(req, res) {
  try {
    const { id_usuario } = req.auth;

    const band = await findVenueEventByUserId(id_usuario);

    if (!band) {
      const error = new Error(
        "Este usuario no tiene asignado ningún perfil de local o evento"
      );
      error.status = 400;
      throw error;
    }
    res.send(band);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVenueEventByUserId;
