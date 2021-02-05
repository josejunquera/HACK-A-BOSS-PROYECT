"use strict";

const {
  findGenresOfMusician,
} = require("../../repositories/genres-repository");
const { findAllMusicians } = require("../../repositories/musicians-repository");

const createJsonError = require("../errors/create-json-errors");

async function getMusiciansWithGenre(req, res) {
  try {
    const musicians = await findAllMusicians();
    let allMusicians = new Array();

    for (let i = 0; i < musicians.length; i++) {
      let genresOfMusician = await findGenresOfMusician(
        musicians[i].id_solista
      );
      musicians[i].generos = new Array();
      genresOfMusician.forEach((element) => {
        musicians[i].generos.push(element.nombre_genero);
      });
      allMusicians.push(musicians[i]);
    }

    res.send(allMusicians);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getMusiciansWithGenre;
