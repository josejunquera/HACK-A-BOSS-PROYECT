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
  nombreUsuario: Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/),
  nombre: Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/),
  apellido: Joi.string().regex(/^[a-zA-Z0-9ñÑ!@#$%&*" "áéíóú]{3,25}$/),
  email: Joi.string().email(),
});

async function updateUser(req, res) {
  try {
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const { nombreUsuario, nombre, apellido, email } = req.body;

    const userById = await findUserById(id_usuario);

    const userByEmail = await findUserByEmail(email);

    if (userByEmail && userByEmail.id_usuario !== id_usuario) {
      const error = new Error("Ya existe un usuario con este email");
      error.status = 409;
      throw error;
    }

    await updateUserById({
      id_usuario,
      nombreUsuario,
      nombre,
      apellido,
      email,
      // contrasena: updatePassword,
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
