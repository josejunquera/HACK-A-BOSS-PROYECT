"use strict";

const Joi = require("joi");
const { findBandByMovility } = require("../../repositories/bands-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/);

async function getBandByMovility(req, res) {
  try {
    const { movility } = req.params;

    await schema.validateAsync(movility);

    const band = await findBandByMovility(movility);

    if (!band[0]) {
      const error = new Error(
        "No existen usuarios que cumplan los criterios de búsqueda"
      );
      error.status = 400;
      throw error;
    }
    res.send(band);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandByMovility;
