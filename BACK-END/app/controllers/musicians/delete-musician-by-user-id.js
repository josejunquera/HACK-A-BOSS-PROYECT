"use strict";

const Joi = require("joi");
const {
  findUserIdOfMusician,
  removeMusicianByUserId,
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive();

async function deleteMusicianByUserId(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { id } = req.params;

    await schema.validateAsync(id);

    const musicianIdOfUser = await findMusicianIdOfUser(id);

    if (!musicianIdOfUser) {
      const error = new Error("El solista que intentas borrar no existe");
      error.status = 400;
      throw error;
    }

    if (req.auth.rol !== "admin" && id != id_usuario) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    await removeMusicianByUserId(id);
    res.send({ message: `El solista del usuario ${id} ha sido borrado` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteMusicianByUserId;
