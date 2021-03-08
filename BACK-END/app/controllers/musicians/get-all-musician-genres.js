"use strict";
const {
  findGenresOfMusicianByUserId,
} = require("../../repositories/genres-repository");
const createJsonError = require("../errors/create-json-errors");

async function getMusicianGenres(req, res) {
  try {
    const { id_usuario } = req.auth;

    const genres = await findGenresOfMusicianByUserId(id_usuario);

    res.send(genres);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicianGenres;
