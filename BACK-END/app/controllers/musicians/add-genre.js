"use strict";
const Joi = require("joi");

const createJsonError = require("../errors/create-json-errors");
const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const {
  findGenreId,
  insertMusicianIdAndGenreIdIntoIsPlayed,
} = require("../../repositories/genres-repository");

const schema = Joi.object().keys({
  genero: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*]{3,25}$/)
    .required(),
});

async function addGenreToMusician(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const musicianIdOfUser = await findMusicianIdOfUser(id_usuario);
    const { genero } = req.body;
    const genreId = await findGenreId(genero);
    console.log(musicianIdOfUser.id_solista);
    console.log(genreId[0].id_genero);

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

    await insertMusicianIdAndGenreIdIntoIsPlayed(
      musicianIdOfUser.id_solista,
      genreId[0].id_genero
    );

    res.status(201).send({ message: `El genero se ha asociado al musico` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addGenreToMusician;
