"use strict";

const { findBandIdOfUser } = require("../../repositories/bands-repository");
const {
  findBandMediaByType,
} = require("../../repositories/multimedia-repository");
const createJsonError = require("../errors/create-json-errors");

async function getBandMediaByType(req, res) {
  try {
    const { id_usuario } = req.auth;

    const { tipo } = req.params;

    const bandId = await findBandIdOfUser(id_usuario);

    const bandMedia = await findBandMediaByType(bandId.id_banda, tipo);

    res.send(bandMedia);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandMediaByType;
