"use strict";

const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const {
  findMusicianMediaByType,
} = require("../../repositories/multimedia-repository");
const createJsonError = require("../errors/create-json-errors");

async function getMusicianMediaByType(req, res) {
  try {
    const { id_usuario } = req.auth;

    const { tipo } = req.params;

    const musicianId = await findMusicianIdOfUser(id_usuario);

    const musicianMedia = await findMusicianMediaByType(
      musicianId.id_solista,
      tipo
    );

    res.send(musicianMedia);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianMediaByType;
