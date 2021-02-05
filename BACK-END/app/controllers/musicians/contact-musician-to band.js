"use strict";

const { func } = require("joi");
const Joi = require("joi");
const {
  insertBandAndMusicianIntoContactTable,
  findBandIdOfUser,
  findUserIdOfBandByName,
} = require("../../repositories/bands-repository");
const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const { findEmailByUser } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");
const { sendEmailMusicianToBand } = require("../../helpers/mail-smtp");

const schema = Joi.object().keys({
  nombreBanda: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  mensaje: Joi.string().min(10).max(500).required(),
});

async function contactToBand(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { mensaje } = req.body;
    const { nombreBanda } = req.body;

    await schema.validateAsync(req.body);

    const musicianEmail = await findEmailByUser(id_usuario);

    const bandUserId = await findUserIdOfBandByName(nombreBanda);

    if (!bandUserId[0]) {
      const error = new Error(
        "La banda con la que intentas contactar no existe"
      );
      error.status = 400;
      throw error;
    }

    const bandEmail = await findEmailByUser(bandUserId[0].id_usuario);

    const bandId = await findBandIdOfUser(bandUserId[0].id_usuario);

    const musicianId = await findMusicianIdOfUser(id_usuario);

    await insertBandAndMusicianIntoContactTable(
      mensaje,
      musicianId.id_solista,
      bandId.id_banda
    );

    await sendEmailMusicianToBand(
      bandEmail[0].email,
      musicianEmail[0].email,
      mensaje
    );

    res.send({ message: "Tu mensaje ha sido enviado" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = contactToBand;
