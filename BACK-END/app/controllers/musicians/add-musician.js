"use strict";

const Joi = require("joi");
const { findUserById } = require("../../repositories/users-repository");
const { createMusician } = require("../../repositories/musicians-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  idUsuario: Joi.number().positive().required(),
  nombreSolista: Joi.string().alphanum().min(2).max(100).required(),
  especialidad: Joi.string().alphanum().min(2).max(100).required(),
  localizacion: Joi.string().alphanum().min(2).max(100).required(),
  movilidad: Joi.string()
    .valid("local", "provincial", "nacional", "internacional")
    .required(),
  buscoBanda: Joi.boolean().required(),
  buscoActuación: Joi.boolean().required(),
  descripcion: Joi.string().alphanum().min(10).max(500),
});

async function addMusician(req, res) {
  try {
    console.log(req);
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const {
      idUsuario,
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
      idUsuario,
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
      idUsuario,
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
