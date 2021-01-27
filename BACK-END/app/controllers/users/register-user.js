"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");
const { createUser } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  nombreUsuario: Joi.string().alphanum().min(2).max(100).required(),
  nombre: Joi.string().alphanum().min(2).max(30).required(),
  apellido: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(100).required(),
  repeatPassword: Joi.ref("password"),
});

async function registerUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { nombreUsuario, nombre, apellido, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const id = await createUser(
      nombreUsuario,
      nombre,
      apellido,
      email,
      passwordHash,
      "reader"
    );

    res
      .status(201)
      .send({ id, nombreUsuario, nombre, apellido, email, rol: "reader" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = registerUser;
