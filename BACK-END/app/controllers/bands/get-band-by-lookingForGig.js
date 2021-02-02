"use strict";

const Joi = require("joi");
const {
  findBandByLookingForGig,
} = require("../../repositories/bands-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().valid("si", "no").required();

async function getBandByLookingForGig(req, res) {
  try {
    const { response } = req.params;

    await schema.validateAsync(response);
    const band = await findBandByLookingForGig(response);

    if (!band[0]) {
      const error = new Error(
        "No existen usuarios que cumplan los criterios de búsqueda"
      );
      error.status = 400;
      throw error;
    }
    res.send(band);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandByLookingForGig;
