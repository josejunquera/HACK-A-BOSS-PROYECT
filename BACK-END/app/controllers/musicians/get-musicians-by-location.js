"use strict";

const Joi = require("joi");
const {
  findMusicianByLocation,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*]{3,25}$/);

async function getMusicianByLocation(req, res) {
  try {
    const { location } = req.params;

    await schema.validateAsync(location);

    const musician = await findMusicianByLocation(location);

    if (!location) {
      const error = new Error("No existe usuarios en esa localizacion");
      error.status = 400;
      throw error;
    }
    res.send(musician);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianByLocation;
