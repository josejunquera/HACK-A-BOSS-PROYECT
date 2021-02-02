"use strict";

const database = require("../infrastructure/database");

async function findGenreId(genre) {
  const pool = await database.getPool();
  const query = "SELECT id_genero FROM genero WHERE genero = ?";
  const [genreId] = await pool.query(query, genre);

  return genreId;
}

async function insertMusicianIdAndGenreIdIntoIsPlayed(musicianId, genreId) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO es_tocado_solista(id_solista, id_genero) VALUES(?,?)";
  const [created] = await pool.query(insertQuery, [musicianId, genreId]);

  return created;
}

module.exports = { findGenreId, insertMusicianIdAndGenreIdIntoIsPlayed };
