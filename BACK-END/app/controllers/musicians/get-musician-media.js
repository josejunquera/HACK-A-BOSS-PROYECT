"use strict";

const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");
const {
  findMusicianMedia,
} = require("../../repositories/multimedia-repository");
const createJsonError = require("../errors/create-json-errors");

async function getMusicianMedia(req, res) {
  try {
    const { id_usuario } = req.auth;

    const musicianId = await findMusicianIdOfUser(id_usuario);

    const musicianMedia = await findMusicianMedia(musicianId.id_solista);

    res.send(musicianMedia);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianMedia;
