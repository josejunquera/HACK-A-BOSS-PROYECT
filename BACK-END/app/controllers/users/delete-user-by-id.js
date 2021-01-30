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

    await schema.validateAsync(id);

    const user = await findUserById(id);
    if (!user) {
      const error = new Error("El usuario que intentas borrar no existe");
      error.status = 400;
      throw error;
    }

    if (req.auth.rol !== "admin" && id_usuario != id) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    await removeUserById(id);
    res.send({ message: `El usuario ${id} ha sido borrado` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUserById;
