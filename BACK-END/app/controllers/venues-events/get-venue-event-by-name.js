"use strict";

const Joi = require("joi");
const {
  findVenueEventByName,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/);

async function getVenueEventByName(req, res) {
  try {
    const { name } = req.params;

    await schema.validateAsync(name);

    const venueEvent = await findVenueEventByName(name);

    if (!venueEvent[0]) {
      const error = new Error(
        "No existen usuarios que cumplan los criterios de búsqueda"
      );
      error.status = 400;
      throw error;
    }
    res.send(venueEvent);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVenueEventByName;
