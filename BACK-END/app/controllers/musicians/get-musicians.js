"use strict";

const { findAllMusicians } = require("../../repositories/musicians-repository");

const createJsonError = require("../errors/create-json-errors");

async function getMusicians(req, res) {
  try {
    const musicians = await findAllMusicians();

    res.send(musicians);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusicians;
