"use strict";

const Joi = require("joi");
const { findBandByUserId } = require("../../repositories/bands-repository");
const createJsonError = require("../errors/create-json-errors");

async function getBandByUserId(req, res) {
  try {
    const { id_usuario } = req.auth;

    const band = await findBandByUserId(id_usuario);

    if (!band) {
      const error = new Error(
        "Este usuario no tiene asignado ningún perfil de banda"
      );
      error.status = 400;
      throw error;
    }
    res.send(band);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandByUserId;
