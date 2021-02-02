"use strict";

const Joi = require("joi");
const {
  findUserIdOfBand,
  removeBandByUserId,
  findBandIdOfUser,
} = require("../../repositories/bands-repository");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive();

async function deleteBandByUserId(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { id } = req.params;

    await schema.validateAsync(id);

    const bandIdOfUser = await findBandIdOfUser(id);

    if (!bandIdOfUser) {
      const error = new Error("La banda que intentas borrar no existe");
      error.status = 400;
      throw error;
    }

    if (req.auth.rol !== "admin" && id != id_usuario) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    await removeBandByUserId(id);
    res.send({ message: `La banda del usuario ${id} ha sido borrado` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteBandByUserId;
