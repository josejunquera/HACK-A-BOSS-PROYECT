"use strict";

const {
  findGenresOfMusician,
} = require("../../repositories/genres-repository");
const { findAllMusicians } = require("../../repositories/musicians-repository");

const createJsonError = require("../errors/create-json-errors");

async function getMusiciansWithGenre(req, res) {
  try {
    const musicians = await findAllMusicians();
    console.log(musicians);

    await musicians.forEach((musician) => {
      const test = findGenresOfMusician(musician.id_solista);
      console.log(test);
    });

    // const genres = await findGenresOfMusician();
    // console.log(genres);

    res.send(genres);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusiciansWithGenre;
