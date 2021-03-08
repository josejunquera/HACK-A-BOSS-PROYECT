"use strict";

const { findAllGenres } = require("../../repositories/genres-repository");

const createJsonError = require("../errors/create-json-errors");

async function getAllGenres(req, res) {
  try {
    const genres = await findAllGenres();

    res.send(genres);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getAllGenres;
