"uses strict";

const Joi = require("joi");

const {
  removeBandGenre,
  findGenreIdByBandId,
} = require("../../repositories/genres-repository");
const { findBandIdOfUser } = require("../../repositories/bands-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  genero: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
});

async function deleteGenreToBand(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const bandIdOfUser = await findBandIdOfUser(id_usuario);
    const { genero } = req.body;

    if (!bandIdOfUser) {
      const error = new Error(
        "La banda a la que le intentas borrar el género no existe"
      );
      error.status = 409;
      throw error;
    }
    const existsGenreIdIntoBand = await findGenreIdByBandId(
      bandIdOfUser.id_banda,
      genero
    );
    if (!existsGenreIdIntoBand[0]) {
      const error = new Error(
        "El género que intentas borrar no está asociado a la banda"
      );
      error.status = 409;
      throw error;
    }
    await removeBandGenre(bandIdOfUser.id_banda, genero);
    res.status(201).send({ message: `El género ${genero} ha sido borrado` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteGenreToBand;
