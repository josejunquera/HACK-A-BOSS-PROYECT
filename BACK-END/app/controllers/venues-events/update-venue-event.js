"use strict";

const Joi = require("joi");
const {
  updateVenueEventByUserId,
  findVenueEventByUserId,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  nombreLocalEvento: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  localizacion: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/)
    .required(),
  descripcion: Joi.string().min(10).max(500),
});

async function updateVenueEvent(req, res) {
  try {
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const { nombreLocalEvento, localizacion, descripcion } = req.body;

    const venueEventOfUser = await findVenueEventByUserId(id_usuario);

    if (!venueEventOfUser) {
      const error = new Error(
        "No existe un local o evento asignado al usuario"
      );
      error.status = 409;
      throw error;
    }

    await updateVenueEventByUserId({
      id_usuario,
      nombreLocalEvento,
      localizacion,
      descripcion,
    });

    res.send({
      id_usuario,
      nombreLocalEvento,
      localizacion,
      descripcion,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateVenueEvent;
