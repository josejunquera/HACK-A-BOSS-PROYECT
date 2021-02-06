"use strict";

const { findGenresOfBand } = require("../../repositories/genres-repository");
const { findAllBands } = require("../../repositories/bands-repository");

const createJsonError = require("../errors/create-json-errors");

async function getBandsWithGenre(req, res) {
  try {
    const bands = await findAllBands();
    let allBands = new Array();

    for (let i = 0; i < bands.length; i++) {
      let genresOfBand = await findGenresOfBand(bands[i].id_banda);
      bands[i].generos = new Array();
      genresOfBand.forEach((element) => {
        bands[i].generos.push(element.nombre_genero);
      });
      allBands.push(bands[i]);
    }

    res.send(allBands);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getBandsWithGenre;
