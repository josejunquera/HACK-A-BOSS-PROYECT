"use strict";

const { findAllBands } = require("../../repositories/bands-repository");

const createJsonError = require("../errors/create-json-errors");

async function getBands(req, res) {
  try {
    const musicians = await findAllBands();

    res.send(musicians);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBands;
