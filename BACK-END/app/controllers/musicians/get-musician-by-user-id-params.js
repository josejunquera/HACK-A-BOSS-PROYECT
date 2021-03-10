"use strict";

const Joi = require("joi");
const {
  findMusicianByUserId,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

async function getMusicianByUserIdParams(req, res) {
  try {
    const { id_usuario } = req.params;

    const musician = await findMusicianByUserId(id_usuario);

    if (!musician) {
      const error = new Error(
        "Este usuario no tiene asignado ningún perfil de solista"
      );
      error.status = 400;
      throw error;
    }
    res.send(musician);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianByUserIdParams;
