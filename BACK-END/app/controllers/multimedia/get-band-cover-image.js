"use strict";

const {
  findCoverImageOfBand,
} = require("../../repositories/multimedia-repository");

const createJsonError = require("../errors/create-json-errors");

async function getCoverImageOfBand(req, res) {
  try {
    const { idBanda } = req.params;

    const coverImage = await findCoverImageOfBand(idBanda, "CoverImage");

    if (coverImage) {
      res.send(coverImage);
    } else {
      res.send([]);
    }
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getCoverImageOfBand;
