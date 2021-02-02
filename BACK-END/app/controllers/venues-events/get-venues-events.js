"use strict";

const {
  findAllVenuesEvents,
} = require("../../repositories/venues-events-repository");

const createJsonError = require("../errors/create-json-errors");

async function getVenuesEvents(req, res) {
  try {
    const venuesEvents = await findAllVenuesEvents();

    res.send(venuesEvents);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getVenuesEvents;
