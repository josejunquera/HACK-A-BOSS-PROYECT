"use strict";

const Joi = require("joi");
const {
  findVenueEventByLocation,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/);

async function getVenueEventByLocation(req, res) {
  try {
    const { location } = req.params;

    await schema.validateAsync(location);

    const venueEvent = await findVenueEventByLocation(location);

    if (!venueEvent[0]) {
      const error = new Error(
        "No existen locales o eventos que cumplan los criterios de búsqueda"
      );
      error.status = 400;
      throw error;
    }
    res.send(venueEvent);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVenueEventByLocation;
