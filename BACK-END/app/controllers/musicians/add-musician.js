"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/users-repository");
const {
  createMusician,
  findMusicianByUserID,
} = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");
const jwt = require("jsonwebtoken");

const schema = Joi.object().keys({
  nombreSolista: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*]{3,25}$/)
    .required(),
  especialidad: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*]{3,25}$/)
    .required(),
  localizacion: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*]{3,25}$/)
    .required(),
  movilidad: Joi.string()
    .valid("local", "provincial", "nacional", "internacional")
    .required(),
  buscoBanda: Joi.string().valid("si", "no").required(),
  buscoActuacion: Joi.string().valid("si", "no").required(),
  descripcion: Joi.string().alphanum().min(10).max(500),
});

async function addMusician(req, res) {
  try {
    const { id_usuario } = req.auth;
    await schema.validateAsync(req.body);

    const existMusicianWithUserId = await findMusicianByUserID(id_usuario);
    if (existMusicianWithUserId) {
      const error = new Error("Ya existe un solista asignado a este usuario");
      error.status = 409;
      throw error;
    }

    const {
      nombreSolista,
      especialidad,
      localizacion,
      movilidad,
      buscoBanda,
      buscoActuacion,
      descripcion,
    } = req.body;

    const idSolista = await createMusician(
      id_usuario,
      nombreSolista,
      especialidad,
      localizacion,
      movilidad,
      buscoBanda,
      buscoActuacion,
      descripcion
    );

    res.status(201).send({
      idSolista,
      nombreSolista,
      especialidad,
      localizacion,
      movilidad,
      buscoBanda,
      buscoActuacion,
      descripcion,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = addMusician;
