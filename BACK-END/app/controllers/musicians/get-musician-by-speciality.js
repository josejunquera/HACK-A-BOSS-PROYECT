"use strict";

const Joi = require("joi");
const {
  findMusicianBySpeciality,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*]{3,25}$/);

async function getMusicianBySpeciality(req, res) {
  try {
    const { speciality } = req.params;

    await schema.validateAsync(speciality);

    const musician = await findMusicianBySpeciality(speciality);

    if (!speciality) {
      const error = new Error("No existe usuarios en esa especialidad");
      error.status = 400;
      throw error;
    }
    res.send(musician);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianBySpeciality;
