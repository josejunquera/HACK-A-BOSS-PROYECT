"use strict";

const database = require("../infrastructure/database");

async function findGenreId(genre) {
  const pool = await database.getPool();
  const query = "SELECT id_genero FROM genero WHERE genero = ?";
  const [genreId] = await pool.query(query, genre);

  return genreId;
}

async function removeMusicianGenre(musicianId, genre) {
  const pool = await database.getPool();
  const query =
    "DELETE FROM es_tocado_solista WHERE id_solista = ? AND nombre_genero = ?";
  await pool.query(query, [musicianId, genre]);
  return true;
}

async function insertMusicianIdAndGenreIdIntoIsPlayed(
  musicianId,
  genreId,
  genre,
  userId
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO es_tocado_solista(id_solista, id_genero, nombre_genero,id_usuario) VALUES(?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    musicianId,
    genreId,
    genre,
    userId,
  ]);

  return created;
}

async function findGenreIdByMusicianId(musicianId, genre) {
  const pool = await database.getPool();
  const query =
    "SELECT id_genero FROM es_tocado_solista WHERE id_solista= ? AND nombre_genero= ?";
  const [genreId] = await pool.query(query, [musicianId, genre]);

  return genreId;
}

module.exports = {
  findGenreId,
  insertMusicianIdAndGenreIdIntoIsPlayed,
  findGenreIdByMusicianId,
  removeMusicianGenre,
};
