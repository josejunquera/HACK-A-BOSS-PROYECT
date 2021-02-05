"use strict";

const { func } = require("joi");
const Joi = require("joi");
const {
  insertBandAndMusicianIntoContactTable,
  findBandIdOfUser,
} = require("../../repositories/bands-repository");
const {
  findUserIdOfMusicianByName,
  findMusicianIdByMusicianName,
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const { findEmailByUser } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");
const { sendEmailBandToMusician } = require("../../helpers/mail-smtp");

const schema = Joi.object().keys({
  nombreSolista: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  mensaje: Joi.string().min(10).max(500).required(),
});

async function contactToMusician(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { mensaje } = req.body;
    const { nombreSolista } = req.body;

    await schema.validateAsync(req.body);

    const bandEmail = await findEmailByUser(id_usuario);

    const musicianUserId = await findUserIdOfMusicianByName(nombreSolista);

    if (!musicianUserId[0]) {
      const error = new Error(
        "El músico con el que intentas contactar no existe"
      );
      error.status = 400;
      throw error;
    }

    const musicianEmail = await findEmailByUser(musicianUserId[0].id_usuario);

    const musicianId = await findMusicianIdOfUser(musicianUserId[0].id_usuario);

    const bandId = await findBandIdOfUser(id_usuario);

    await insertBandAndMusicianIntoContactTable(
      mensaje,
      musicianId.id_solista,
      bandId.id_banda
    );

    await sendEmailBandToMusician(
      musicianEmail[0].email,
      bandEmail[0].email,
      mensaje
    );

    res.send({ message: "Tu mensaje ha sido enviado" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = contactToMusician;
