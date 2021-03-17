"use strict";
const {
  findGenresOfMusicianByUserId,
} = require("../../repositories/genres-repository");
const createJsonError = require("../errors/create-json-errors");

async function getMusicianGenresParams(req, res) {
  try {
    const { id_usuario } = req.params;

    const genres = await findGenresOfMusicianByUserId(id_usuario);

    res.send(genres);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianGenresParams;
