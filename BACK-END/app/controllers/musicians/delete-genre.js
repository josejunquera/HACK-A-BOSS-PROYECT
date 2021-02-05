"uses strict";

const Joi = require("joi");

const {
  removeMusicianGenre,
  findGenreIdByMusicianId,
} = require("../../repositories/genres-repository");
const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  genero: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
});

async function deleteGenreToMusician(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const musicianIdOfUser = await findMusicianIdOfUser(id_usuario);
    const { genero } = req.body;

    if (!musicianIdOfUser) {
      const error = new Error(
        "El músico al que intentas borrar el género no existe"
      );
      error.status = 409;
      throw error;
    }
    const existsGenreIdIntoMusician = await findGenreIdByMusicianId(
      musicianIdOfUser.id_solista,
      genero
    );
    if (!existsGenreIdIntoMusician[0]) {
      const error = new Error(
        "El género que intentas borrar no está asociado al músico"
      );
      error.status = 409;
      throw error;
    }
    await removeMusicianGenre(musicianIdOfUser.id_solista, genero);
    res.status(201).send({ message: `El género ${genero} ha sido borrado` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteGenreToMusician;
