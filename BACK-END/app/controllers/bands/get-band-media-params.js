"use strict";

const { findBandIdOfUser } = require("../../repositories/bands-repository");
const { findBandMedia } = require("../../repositories/multimedia-repository");
const createJsonError = require("../errors/create-json-errors");

async function getBandMediaParams(req, res) {
  try {
    const { id_usuario } = req.params;

    const bandId = await findBandIdOfUser(id_usuario);

    const bandMedia = await findBandMedia(bandId.id_banda);

    res.send(bandMedia);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandMediaParams;
