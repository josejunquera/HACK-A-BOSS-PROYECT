"use strict";

const Joi = require("joi");
const {
  updateMusicianByUserId,
  findMusicianByUserId,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  nombreSolista: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  especialidad: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  localizacion: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  movilidad: Joi.string()
    .valid("local", "provincial", "nacional", "internacional")
    .required(),
  buscoBanda: Joi.string().valid("si", "no").required(),
  buscoActuacion: Joi.string().valid("si", "no").required(),
  descripcion: Joi.string().min(10).max(500),
});

async function updateMusician(req, res) {
  try {
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const {
      nombreSolista,
      especialidad,
      localizacion,
      movilidad,
      buscoBanda,
      buscoActuacion,
      descripcion,
    } = req.body;

    const musicianOfUser = await findMusicianByUserId(id_usuario);

    if (!musicianOfUser) {
      const error = new Error("No existe un solista asignado al usuario");
      error.status = 409;
      throw error;
    }

    await updateMusicianByUserId({
      id_usuario,
      nombreSolista,
      especialidad,
      localizacion,
      movilidad,
      buscoBanda,
      buscoActuacion,
      descripcion,
    });

    res.send({ message: "El músico ha sido actualizado con éxito" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateMusician;
