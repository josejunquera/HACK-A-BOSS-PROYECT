"use strict";

const { func } = require("joi");
const Joi = require("joi");
const {
  findUserById,
  removeUserById,
} = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive();

async function deleteUserById(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { id } = req.params;
    console.log(id);
    console.log(id_usuario);
    await schema.validateAsync(id);

    if (req.auth.rol !== "admin" || id_usuario !== id) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    const user = await findUserById(id);
    if (!user) {
      const error = new Error("El usuario que intentas borrar no existe");
      error.status = 400;
      throw error;
    }

    await removeUserById(id);
    res.status(204).send();
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUserById;
