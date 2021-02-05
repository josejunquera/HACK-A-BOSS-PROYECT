"use strict";
const Joi = require("joi");

const createJsonError = require("../errors/create-json-errors");
const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const {
  findGenreId,
  insertMusicianIdAndGenreIdIntoIsPlayed,
  findGenreIdByMusicianId,
} = require("../../repositories/genres-repository");

const schema = Joi.object().keys({
  genero: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*áéíóú]{3,25}$/)
    .required(),
});

async function addGenreToMusician(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const musicianIdOfUser = await findMusicianIdOfUser(id_usuario);
    const { genero } = req.body;
    const genreId = await findGenreId(genero);

    if (!musicianIdOfUser) {
      const error = new Error("El musico no existe");
      error.status = 409;
      throw error;
    }

    if (!genreId[0]) {
      const error = new Error("El genero no existe");
      error.status = 409;
      throw error;
    }

    const existsGenreIdIntoMusician = await findGenreIdByMusicianId(
      musicianIdOfUser.id_solista,
      genero
    );

    if (existsGenreIdIntoMusician[0]) {
      const error = new Error("El músico ya tiene asociado este género");
      error.status = 409;
      throw error;
    }

    await insertMusicianIdAndGenreIdIntoIsPlayed(
      musicianIdOfUser.id_solista,
      genreId[0].id_genero,
      genero,
      id_usuario
    );

    res.status(201).send({ message: `El genero se ha asociado al musico` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addGenreToMusician;
