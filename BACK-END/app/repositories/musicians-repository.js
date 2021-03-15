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

  return musicians;
}

async function findUserIdOfMusician(musicianId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE id_usuario = ?";
  const [musician] = await pool.query(query, musicianId);

  return musician[0];
}

async function findUserIdOfMusicianByName(musicianName) {
  const pool = await database.getPool();
  const query = "SELECT id_usuario FROM solista WHERE nombre_solista = ?";
  const [userId] = await pool.query(query, musicianName);

  return userId;
}

async function findMusicianById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE id_solista = ?";
  const [musician] = await pool.query(query, id);

  return musician[0];
}

async function findMusicianByUserId(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE id_usuario = ?";
  const [musician] = await pool.query(query, id);

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

async function findMusicianIdByMusicianName(name) {
  const pool = await database.getPool();
  const query = "SELECT id_solista FROM solista WHERE nombre_solista = ?";
  const [musicianId] = await pool.query(query, name);

  return musicianId[0];
}

async function findMusicianByLookingForBand(response) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE busco_banda = ?";
  const [musician] = await pool.query(query, response);

  return musician;
}

async function findMusicianByLookingForGig(response) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE busco_actuacion = ?";
  const [musician] = await pool.query(query, response);

  return musician;
}

async function removeMusicianByUserId(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM solista WHERE id_usuario = ?";
  await pool.query(query, id);

  return true;
}

async function findMusicianIdOfUser(id) {
  const pool = await database.getPool();
  const query = "SELECT id_solista FROM solista WHERE id_usuario = ?";
  const [musician] = await pool.query(query, id);

  return musician[0];
}

async function updateMusicianByUserId(data) {
  const {
    id_usuario,
    nombreSolista,
    especialidad,
    localizacion,
    movilidad,
    buscoBanda,
    buscoActuacion,
    descripcion,
  } = data;

  const pool = await database.getPool();
  const updateQuery =
    "UPDATE solista SET nombre_solista = ?, especialidad = ?, localizacion = ?,movilidad = ?, busco_banda = ?, busco_actuacion = ?, descripcion = ? WHERE id_usuario = ?";
  await pool.query(updateQuery, [
    nombreSolista,
    especialidad,
    localizacion,
    movilidad,
    buscoBanda,
    buscoActuacion,
    descripcion,
    id_usuario,
  ]);

  return true;
}

async function findAllContractRequests(musicianId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM es_contratado_solista WHERE id_solista = ?";
  const [contracts] = await pool.query(query, musicianId);

  return contracts;
}

async function findMusicianIdByContractId(contractId) {
  const pool = await database.getPool();
  const query =
    "SELECT id_solista FROM es_contratado_solista WHERE id_contrato = ?";
  const [musicianId] = await pool.query(query, contractId);

  return musicianId;
}

async function insertMusicianResponseIntoContractTable(response, contractID) {
  const pool = await database.getPool();
  const insertQuery =
    "UPDATE es_contratado_solista SET respuesta = ? WHERE id_contrato = ?";
  const [insertResponse] = await pool.query(insertQuery, [
    response,
    contractID,
  ]);

  return insertResponse;
}

module.exports = {
  createMusician,
  findAllMusicians,
  findMusicianIdByContractId,
  findMusicianById,
  findMusicianByLocation,
  findMusicianByLookingForBand,
  findMusicianByLookingForGig,
  findMusicianByMovility,
  findMusicianByName,
  findMusicianBySpeciality,
  findMusicianByUserId,
  findMusicianIdByMusicianName,
  findMusicianIdOfUser,
  findUserIdOfMusician,
  findUserIdOfMusicianByName,
  findAllContractRequests,
  insertMusicianResponseIntoContractTable,
  removeMusicianByUserId,
  updateMusicianByUserId,
};
