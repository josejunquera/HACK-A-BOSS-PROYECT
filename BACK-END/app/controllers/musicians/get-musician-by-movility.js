"use strict";

const Joi = require("joi");
const {
  findMusicianByMovility,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/);

async function getMusicianByMovility(req, res) {
  try {
    const { movility } = req.params;

    await schema.validateAsync(movility);

    const musician = await findMusicianByMovility(movility);

    if (!musician[0]) {
      const error = new Error(
        "No existen usuarios que cumplan los criterios de búsqueda"
      );
      error.status = 400;
      throw error;
    }
    res.send(musician);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianByMovility;
