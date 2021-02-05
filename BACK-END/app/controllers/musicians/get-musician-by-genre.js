"use strict";

const Joi = require("joi");

const { findMusicianByGenre } = require("../../repositories/genres-repository");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string()
  .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
  .required();

async function getMusicianByGenre(req, res) {
  try {
    const { genre } = req.params;
    await schema.validateAsync(genre);

    const musicianWithGenre = await findMusicianByGenre(genre);

    if (!musicianWithGenre[0]) {
      const error = new Error("No existen músicos que toquen ese género");
      error.status = 400;
      throw error;
    }

    res.send(musicianWithGenre);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianByGenre;
