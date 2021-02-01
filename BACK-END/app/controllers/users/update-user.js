"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");
const {
  findUserById,
  findUserByEmail,
  updateUserById,
} = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  nombreUsuario: Joi.string().alphanum().min(2).max(100).required(),
  nombre: Joi.string().alphanum().min(2).max(30).required(),
  apellido: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  repeatPassword: Joi.string().optional(),
});

const schemaPassword = Joi.object().keys({
  password: Joi.string().min(4).max(100).required(),
  repeatPassword: Joi.ref("password"),
});

async function updateUser(req, res) {
  try {
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const {
      nombreUsuario,
      nombre,
      apellido,
      email,
      password,
      repeatPassword,
    } = req.body;

    const userById = await findUserById(id_usuario);

    const userByEmail = await findUserByEmail(email);

    if (userByEmail && userByEmail.id_usuario !== id_usuario) {
      const error = new Error("Ya existe un usuario con este email");
      error.status = 409;
      throw error;
    }

    let updatePassword = userById.contrasena;

    if (password) {
      await schemaPassword.validateAsync({ password, repeatPassword });
      const passwordHash = await bcrypt.hash(password, 12);
      updatePassword = passwordHash;
    }

    await updateUserById({
      id_usuario,
      nombreUsuario,
      nombre,
      apellido,
      email,
      contrasena: updatePassword,
    });
    res.send({
      id_usuario,
      nombreUsuario,
      nombre,
      apellido,
      email,
      rol: userById.rol,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = updateUser;
