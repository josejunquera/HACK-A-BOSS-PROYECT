"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");
const {
  findUserById,
  updateUserPasswordById,
} = require("../../repositories/users-repository");

const createJsonError = require("../errors/create-json-errors");

const schemaPassword = Joi.object().keys({
  newPassword: Joi.string().min(4).max(100).required(),
  repeatNewPassword: Joi.required().valid(Joi.ref("newPassword")),
});

async function updatePassword(req, res) {
  try {
    const { id_usuario } = req.auth;

    const { currentPassword, newPassword, repeatNewPassword } = req.body;
    if (currentPassword === newPassword) {
      const error = new Error(
        "La contraseña actual y la nueva no pueden coincidir"
      );
      error.status = 403;
      throw error;
    }
    const userById = await findUserById(id_usuario);

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      userById.contrasena
    );
    if (!isValidPassword) {
      const error = new Error("Password incorrecto");
      error.status = 403;
      throw error;
    }

    let updatePassword = userById.contrasena;

    await schemaPassword.validateAsync({ newPassword, repeatNewPassword });
    if (newPassword) {
      const passwordHash = await bcrypt.hash(newPassword, 12);
      updatePassword = passwordHash;
    }

    await updateUserPasswordById({ contrasena: updatePassword, id_usuario });

    res.send({ message: "Contraseña cambiada con éxito" });
  } catch (err) {
    createJsonError(err, res);
  }
}
module.exports = updatePassword;
