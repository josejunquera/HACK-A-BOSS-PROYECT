"use strict";
const Joi = require("joi");

const createJsonError = require("../errors/create-json-errors");
const { findBandIdOfUser } = require("../../repositories/bands-repository");
const {
  findGenreId,
  insertBandIdAndGenreIdIntoIsPlayed,
  findGenreIdByBandId,
} = require("../../repositories/genres-repository");

const schema = Joi.object().keys({
  genero: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
});

async function addGenreToBand(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const bandIdOfUser = await findBandIdOfUser(id_usuario);
    const { genero } = req.body;
    const genreId = await findGenreId(genero);

    if (!bandIdOfUser) {
      const error = new Error("La banda no existe");
      error.status = 409;
      throw error;
    }

    if (!genreId[0]) {
      const error = new Error("El genero no existe");
      error.status = 409;
      throw error;
    }

    const existsGenreIdIntoBand = await findGenreIdByBandId(
      bandIdOfUser.id_banda,
      genero
    );

    if (existsGenreIdIntoBand[0]) {
      const error = new Error("La banda ya tiene asociado este género");
      error.status = 409;
      throw error;
    }

    await insertBandIdAndGenreIdIntoIsPlayed(
      bandIdOfUser.id_banda,
      genreId[0].id_genero,
      genero,
      id_usuario
    );

    res.status(201).send({ message: `El genero se ha asociado a la banda` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addGenreToBand;
