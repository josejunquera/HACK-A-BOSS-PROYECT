"use strict";

const database = require("../infrastructure/database");

async function createMusician(
  idUsuario,
  nombreSolista,
  especialidad,
  localizacion,
  movilidad,
  buscoBanda,
  buscoActuacion,
  descripcion
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO solista(id_usuario, nombre_solista, especialidad, localizacion, movilidad, busco_banda, busco_actuacion, descripcion) VALUES (?,?,?,?,?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    idUsuario,
    nombreSolista,
    especialidad,
    localizacion,
    movilidad,
    buscoBanda,
    buscoActuacion,
    descripcion,
  ]);

  return created.insertId;
}

async function findAllMusicians() {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista";
  const [musicians] = await pool.query(query);
  console.log(musicians);
  return musicians;
}

async function findMusicianByUserID(userId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE id_usuario = ?";
  const [musician] = await pool.query(query, userId);

  return musician[0];
}

async function findMusicianByLocation(location) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE localizacion = ?";
  const [musician] = await pool.query(query, location);

  return musician;
}

async function findMusicianBySpeciality(speciality) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE especialidad = ?";
  const [musician] = await pool.query(query, speciality);

  return musician;
}

async function findMusicianByMovility(movility) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE movilidad = ?";
  const [musician] = await pool.query(query, movility);

  return musician;
}

async function findMusicianByName(name) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE nombre_solista = ?";
  const [musician] = await pool.query(query, name);

  return musician;
}

module.exports = {
  createMusician,
  findAllMusicians,
  findMusicianByLocation,
  findMusicianByUserID,
  findMusicianBySpeciality,
  findMusicianByMovility,
  findMusicianByName,
};
