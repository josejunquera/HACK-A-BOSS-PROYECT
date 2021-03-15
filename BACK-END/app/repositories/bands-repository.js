"use strict";

const database = require("../infrastructure/database");

async function createBand(
  idUsuario,
  nombreBanda,
  localizacion,
  movilidad,
  buscoSolista,
  buscoActuacion,
  descripcion
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO banda(id_usuario, nombre_banda,localizacion, movilidad, busco_solista, busco_actuacion, descripcion) VALUES (?,?,?,?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    idUsuario,
    nombreBanda,
    localizacion,
    movilidad,
    buscoSolista,
    buscoActuacion,
    descripcion,
  ]);

  return created.insertId;
}

async function findAllBands() {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda";
  const [bands] = await pool.query(query);

  return bands;
}

async function findUserIdOfBand(bandId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE id_usuario = ?";
  const [band] = await pool.query(query, bandId);

  return band[0];
}

async function findUserIdOfBandByName(bandName) {
  const pool = await database.getPool();
  const query = "SELECT id_usuario FROM banda WHERE nombre_banda = ?";
  const [userId] = await pool.query(query, bandName);

  return userId;
}

async function findBandById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE id_banda = ?";
  const [band] = await pool.query(query, id);

  return band[0];
}

async function findBandByUserId(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE id_usuario = ?";
  const [band] = await pool.query(query, id);

  return band[0];
}

async function findBandByLocation(location) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE localizacion = ?";
  const [band] = await pool.query(query, location);

  return band;
}

async function findBandByMovility(movility) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE movilidad = ?";
  const [band] = await pool.query(query, movility);

  return band;
}

async function findBandByName(name) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE nombre_banda = ?";
  const [band] = await pool.query(query, name);

  return band;
}

async function findBandByLookingForMusician(response) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE busco_solista = ?";
  const [band] = await pool.query(query, response);

  return band;
}

async function findBandByLookingForGig(response) {
  const pool = await database.getPool();
  const query = "SELECT * FROM banda WHERE busco_actuacion = ?";
  const [band] = await pool.query(query, response);

  return band;
}

async function removeBandByUserId(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM banda WHERE id_usuario = ?";
  await pool.query(query, id);

  return true;
}

async function findBandIdOfUser(id) {
  const pool = await database.getPool();
  const query = "SELECT id_banda FROM banda WHERE id_usuario = ?";
  const [band] = await pool.query(query, id);

  return band[0];
}

async function updateBandByUserId(data) {
  const {
    id_usuario,
    nombreBanda,
    localizacion,
    movilidad,
    buscoSolista,
    buscoActuacion,
    descripcion,
  } = data;

  const pool = await database.getPool();
  const updateQuery =
    "UPDATE banda SET nombre_banda = ?,localizacion = ?, movilidad = ?, busco_solista = ?, busco_actuacion = ?, descripcion = ? WHERE id_usuario = ?";
  await pool.query(updateQuery, [
    nombreBanda,
    localizacion,
    movilidad,
    buscoSolista,
    buscoActuacion,
    descripcion,
    id_usuario,
  ]);

  return true;
}

async function insertBandAndMusicianIntoContactTable(
  message,
  musicianId,
  bandId
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO se_agrupa (mensaje, id_solista, id_banda) VALUES (?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
    message,
    musicianId,
    bandId,
  ]);

  return created;
}

async function insertBandResponseIntoContractTable(response, contractID) {
  const pool = await database.getPool();
  const insertQuery =
    "UPDATE es_contratado_banda SET respuesta = ? WHERE id_contrato = ?";
  const [insertResponse] = await pool.query(insertQuery, [
    response,
    contractID,
  ]);

  return insertResponse;
}

async function findAllContractRequests(bandId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM es_contratado_banda WHERE id_banda = ?";
  const [contracts] = await pool.query(query, bandId);

  return contracts;
}

async function findBandIdByContractId(contractId) {
  const pool = await database.getPool();
  const query =
    "SELECT id_banda FROM es_contratado_banda WHERE id_contrato = ?";
  const [bandId] = await pool.query(query, contractId);

  return bandId;
}

module.exports = {
  createBand,
  findAllBands,
  findAllContractRequests,
  findBandById,
  findBandByLocation,
  findBandByLookingForGig,
  findBandByLookingForMusician,
  findBandByName,
  findBandByMovility,
  findBandByUserId,
  findUserIdOfBand,
  findUserIdOfBandByName,
  findBandIdByContractId,
  findBandIdOfUser,
  insertBandAndMusicianIntoContactTable,
  insertBandResponseIntoContractTable,
  removeBandByUserId,
  updateBandByUserId,
};
