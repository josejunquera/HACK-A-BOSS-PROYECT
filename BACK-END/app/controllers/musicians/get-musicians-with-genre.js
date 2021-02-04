"use strict";

const {
  findGenresOfMusician,
} = require("../../repositories/genres-repository");
const { findAllMusicians } = require("../../repositories/musicians-repository");

const createJsonError = require("../errors/create-json-errors");

async function getMusiciansWithGenre(req, res) {
  try {
    const musicians = await findAllMusicians();

    await musicians.forEach(async function (musician) {
      let genresOfMusician = await findGenresOfMusician(musician.id_solista);

      console.log(musician);
      console.log(genresOfMusician);
    });

    res.send({ a: "1" });
    // res.send(genres);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusiciansWithGenre;
