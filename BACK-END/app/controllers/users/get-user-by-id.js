"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive().required();

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    await schema.validateAsync(id);

    const user = await findUserById(parseInt(id));
    if (!user) {
      const error = new Error("No existe el id de usuario");
      error.status = 400;
      throw error;
    }
    res.send(user);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUserById;
