"use strict";

const Joi = require("joi");
const {
  createBand,
  findBandByUserId,
  findBandByName,
} = require("../../repositories/bands-repository");
const createJsonError = require("../errors/create-json-errors");
const jwt = require("jsonwebtoken");

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

async function addBand(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const existBandWithUserId = await findBandByUserId(id_usuario);
    if (existBandWithUserId) {
      const error = new Error("Ya existe una banda asignado a este usuario");
      error.status = 409;
      throw error;
    }

    const {
      nombreBanda,
      localizacion,
      movilidad,
      buscoSolista,
      buscoActuacion,
      descripcion,
    } = req.body;

    const existBandWithName = await findBandByName(nombreBanda);

    if (existBandWithName[0]) {
      const error = new Error("Ya existe una banda con ese nombre");
      error.status = 409;
      throw error;
    }
    const idBanda = await createBand(
      id_usuario,
      nombreBanda,
      localizacion,
      movilidad,
      buscoSolista,
      buscoActuacion,
      descripcion
    );

    res.status(201).send({
      idBanda,
      nombreBanda,
      localizacion,
      movilidad,
      buscoSolista,
      buscoActuacion,
      descripcion,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addBand;
