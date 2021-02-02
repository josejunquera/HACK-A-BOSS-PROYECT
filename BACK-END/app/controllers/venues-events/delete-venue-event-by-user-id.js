"use strict";

const Joi = require("joi");
const {
  removeVenueEventByUserId,
  findVenueEventIdOfUser,
} = require("../../repositories/venues-events-repository");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive();

async function deleteVenueEventByUserId(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { id } = req.params;

    await schema.validateAsync(id);

    const venueEventIdOfUser = await findVenueEventIdOfUser(id);

    if (!venueEventIdOfUser) {
      const error = new Error(
        "El local o evento que intentas borrar no existe"
      );
      error.status = 400;
      throw error;
    }

    if (req.auth.rol !== "admin" && id != id_usuario) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    await removeVenueEventByUserId(id);
    res.send({
      message: `El local o evento del usuario ${id} ha sido borrado`,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteVenueEventByUserId;
