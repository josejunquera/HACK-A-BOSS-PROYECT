"use strict";

const database = require("../infrastructure/database");

async function findAllGenres() {
  const pool = await database.getPool();
  const query = "SELECT * FROM genero ";
  const [genres] = await pool.query(query);

  return genres;
}

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

async function removeBandGenre(bandId, genre) {
  const pool = await database.getPool();
  const query =
    "DELETE FROM es_tocado_banda WHERE id_banda = ? AND nombre_genero = ?";
  await pool.query(query, [bandId, genre]);
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

async function insertBandIdAndGenreIdIntoIsPlayed(
  bandId,
  genreId,
  genre,
  userId
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO es_tocado_banda(id_banda, id_genero, nombre_genero,id_usuario) VALUES(?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    bandId,
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

async function findGenreIdByBandId(bandId, genre) {
  const pool = await database.getPool();
  const query =
    "SELECT id_genero FROM es_tocado_banda WHERE id_banda= ? AND nombre_genero= ?";
  const [genreId] = await pool.query(query, [bandId, genre]);

  return genreId;
}

async function findMusicianByGenre(genre) {
  const pool = await database.getPool();
  const query =
    "SELECT solista.nombre_solista, solista.especialidad,solista.localizacion, solista.movilidad, solista.busco_banda, solista.busco_actuacion, solista.descripcion, es_tocado_solista.nombre_genero FROM solista INNER JOIN es_tocado_solista ON solista.id_solista = es_tocado_solista.id_solista WHERE nombre_genero = ?";
  const [musician] = await pool.query(query, genre);

  return musician;
}

async function findBandByGenre(genre) {
  const pool = await database.getPool();
  const query =
    "SELECT banda.nombre_banda,banda.localizacion, banda.movilidad, banda.busco_solista, banda.busco_actuacion, banda.descripcion, es_tocado_banda.nombre_genero FROM banda INNER JOIN es_tocado_banda ON banda.id_banda = es_tocado_banda.id_banda WHERE nombre_genero = ?";
  const [band] = await pool.query(query, genre);

  return band;
}

async function findGenresOfMusician(musicianId) {
  const pool = await database.getPool();
  const query =
    "SELECT nombre_genero FROM es_tocado_solista WHERE id_solista = ? ";

  const [genre] = await pool.query(query, musicianId);

  return genre;
}

async function findGenresOfMusicianByUserId(userId) {
  const pool = await database.getPool();
  const query =
    "SELECT nombre_genero FROM es_tocado_solista WHERE id_usuario = ? ";

  const [genre] = await pool.query(query, userId);

  return genre;
}

async function findGenresOfBand(bandId) {
  const pool = await database.getPool();
  const query = "SELECT nombre_genero FROM es_tocado_banda WHERE id_banda = ? ";

  const [genre] = await pool.query(query, bandId);

  return genre;
}

async function findGenresOfBandByUserId(userId) {
  const pool = await database.getPool();
  const query =
    "SELECT nombre_genero FROM es_tocado_banda WHERE id_usuario = ? ";

  const [genre] = await pool.query(query, userId);

  return genre;
}

module.exports = {
  findAllGenres,
  findBandByGenre,
  findGenreId,
  findGenreIdByBandId,
  findGenreIdByMusicianId,
  findGenresOfBand,
  findGenresOfMusician,
  findMusicianByGenre,
  insertBandIdAndGenreIdIntoIsPlayed,
  insertMusicianIdAndGenreIdIntoIsPlayed,
  removeBandGenre,
  removeMusicianGenre,
  findGenresOfMusicianByUserId,
  findGenresOfBandByUserId,
};
