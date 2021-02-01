"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
} = require("../../repositories/users-repository");
const sendEmailRegistration = require("../../helpers/mail-smtp");
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
    const existUser = await findUserByEmail(email);
    if (existUser) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const id = await createUser(
      nombreUsuario,
      nombre,
      apellido,
      email,
      passwordHash,
      "reader"
    );

    await sendEmailRegistration(nombre, email);
    res
      .status(201)
      .send({ id, nombreUsuario, nombre, apellido, email, rol: "reader" });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = registerUser;
