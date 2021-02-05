"use strict";

const Joi = require("joi");

const { findBandByGenre } = require("../../repositories/genres-repository");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string()
  .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
  .required();

async function getBandByGenre(req, res) {
  try {
    const { genre } = req.params;
    await schema.validateAsync(genre);

    const bandWithGenre = await findBandByGenre(genre);

    if (!bandWithGenre[0]) {
      const error = new Error("No existen bandas que toquen ese género");
      error.status = 400;
      throw error;
    }

    res.send(bandWithGenre);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandByGenre;
