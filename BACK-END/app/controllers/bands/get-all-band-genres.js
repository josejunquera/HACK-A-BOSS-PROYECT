"use strict";

const {
  findGenresOfBandByUserId,
} = require("../../repositories/genres-repository");

const createJsonError = require("../errors/create-json-errors");

async function getBandGenres(req, res) {
  try {
    const { id_usuario } = req.auth;

    const genres = await findGenresOfBandByUserId(id_usuario);

    res.send(genres);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandGenres;
