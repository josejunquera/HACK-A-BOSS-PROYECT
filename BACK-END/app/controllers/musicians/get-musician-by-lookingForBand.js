"use strict";

const Joi = require("joi");
const {
  findMusicianByLookingForBand,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().valid("si", "no").required();

async function getMusicianByLookingForBand(req, res) {
  try {
    const { response } = req.params;

    await schema.validateAsync(response);
    const musician = await findMusicianByLookingForBand(response);

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

module.exports = getMusicianByLookingForBand;
