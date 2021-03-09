"use strict";

const Joi = require("joi");
const {
  updateBandByUserId,
  findBandByUserId,
} = require("../../repositories/bands-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  nombreBanda: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  localizacion: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  movilidad: Joi.string()
    .valid("local", "provincial", "nacional", "internacional")
    .required(),
  buscoSolista: Joi.string().valid("si", "no").required(),
  buscoActuacion: Joi.string().valid("si", "no").required(),
  descripcion: Joi.string().min(10).max(500),
});

async function updateBand(req, res) {
  try {
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const {
      nombreBanda,
      localizacion,
      movilidad,
      buscoSolista,
      buscoActuacion,
      descripcion,
    } = req.body;

    const bandOfUser = await findBandByUserId(id_usuario);

    if (!bandOfUser) {
      const error = new Error("No existe una banda asignado al usuario");
      error.status = 409;
      throw error;
    }

    await updateBandByUserId({
      id_usuario,
      nombreBanda,
      localizacion,
      movilidad,
      buscoSolista,
      buscoActuacion,
      descripcion,
    });

    res.send({ message: "La banda ha sido actualizado con éxito" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateBand;
