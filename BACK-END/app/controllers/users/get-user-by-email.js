"use strict";

const Joi = require("joi");
const { findUserByEmail } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.string().email().required();

async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;

    await schema.validateAsync(email);

    const user = await findUserByEmail(email);
    if (!user) {
      const error = new Error("No existe un usuario con ese email");
      error.status = 400;
      throw error;
    }
    res.send(user);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getUserByEmail;
