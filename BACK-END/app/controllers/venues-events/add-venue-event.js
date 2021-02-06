"use strict";

const Joi = require("joi");
const {
  createVenueEvent,
  findVenueEventByUserId,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");
const jwt = require("jsonwebtoken");

const schema = Joi.object().keys({
  nombreLocalEvento: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú']{3,25}$/)
    .required(),
  localizacion: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú']{3,25}$/)
    .required(),
  descripcion: Joi.string().min(10).max(500),
});

async function addVenueEvent(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const existVenueEventWithUserId = await findVenueEventByUserId(id_usuario);
    if (existVenueEventWithUserId) {
      const error = new Error("Ya existe un local asignado a este usuario");
      error.status = 409;
      throw error;
    }

    const { nombreLocalEvento, localizacion, descripcion } = req.body;

    const idLocalEvento = await createVenueEvent(
      id_usuario,
      nombreLocalEvento,
      localizacion,
      descripcion
    );

    res.status(201).send({
      idLocalEvento,
      nombreLocalEvento,
      localizacion,
      descripcion,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addVenueEvent;
