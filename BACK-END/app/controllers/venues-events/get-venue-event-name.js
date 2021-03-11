"use strict";

const Joi = require("joi");
const {
  findVenueEventNameById,
} = require("../../repositories/venues-events-repository");
const createJsonError = require("../errors/create-json-errors");

async function getVenueEventNameById(req, res) {
  try {
    const { idVenueEvent } = req.params;

    const venueEventName = await findVenueEventNameById(idVenueEvent);

    res.send(venueEventName);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVenueEventNameById;
