"use strict";

const { func } = require("joi");
const Joi = require("joi");
const {
  insertBandAndMusicianIntoContactTable,
} = require("../../repositories/bands-repository");
const {
  findUserIdOfMusician,
  findMusicianIdByMusicianName,
} = require("../../repositories/musicians-repository");

const { findEmailByUser } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

async function contactToMusician(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { mensaje } = req.body;
    const { nombreSolista } = req.body;
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = contactToMusician;
