"use strict";

const {
  findGenresOfBandByUserId,
} = require("../../repositories/genres-repository");

const createJsonError = require("../errors/create-json-errors");

async function getBandGenresParams(req, res) {
  try {
    const { id_usuario } = req.params;

    const genres = await findGenresOfBandByUserId(id_usuario);

    res.send(genres);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandGenresParams;
