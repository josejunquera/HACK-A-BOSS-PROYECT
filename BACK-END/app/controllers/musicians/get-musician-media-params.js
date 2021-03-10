"use strict";

const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const {
  findMusicianMedia,
} = require("../../repositories/multimedia-repository");
const createJsonError = require("../errors/create-json-errors");

async function getMusicianMediaParams(req, res) {
  try {
    const { id_usuario } = req.params;

    const musicianId = await findMusicianIdOfUser(id_usuario);

    const musicianMedia = await findMusicianMedia(musicianId.id_solista);

    res.send(musicianMedia);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianMediaParams;
