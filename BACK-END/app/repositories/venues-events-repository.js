"use strict";

const database = require("../infrastructure/database");

async function createVenueEvent(
  idUsuario,
  nombreLocalEvento,
  localizacion,
  descripcion
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO local_evento(id_usuario, nombre_local_evento, localizacion, descripcion) VALUES (?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    idUsuario,
    nombreLocalEvento,
    localizacion,
    descripcion,
  ]);

  return created.insertId;
}

async function findAllVenuesEvents() {
  const pool = await database.getPool();
  const query = "SELECT * FROM local_evento";
  const [venuesEvents] = await pool.query(query);

  return venuesEvents;
}

async function findUserIdOfVenueEvent(venueEventId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM local_evento WHERE id_usuario = ?";
  const [venueEvent] = await pool.query(query, venueEventId);

  return venueEvent[0];
}

async function findVenueEventById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM local_evento WHERE id_local_evento = ?";
  const [venueEvent] = await pool.query(query, id);

  return venueEvent[0];
}

async function findVenueEventNameById(id) {
  const pool = await database.getPool();
  const query =
    "SELECT nombre_local_evento FROM local_evento WHERE id_local_evento = ?";
  const [venueEvent] = await pool.query(query, id);

  return venueEvent[0];
}

async function findVenueEventByUserId(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM local_evento WHERE id_usuario = ?";
  const [venueEvent] = await pool.query(query, id);

  return venueEvent[0];
}

async function findVenueEventByLocation(location) {
  const pool = await database.getPool();
  const query = "SELECT * FROM local_evento WHERE localizacion = ?";
  const [venueEvent] = await pool.query(query, location);

  return venueEvent;
}

async function findVenueEventByName(name) {
  const pool = await database.getPool();
  const query = "SELECT * FROM local_evento WHERE nombre_local_evento = ?";
  const [venueEvent] = await pool.query(query, name);

  return venueEvent;
}

async function removeVenueEventByUserId(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM local_evento WHERE id_usuario = ?";
  await pool.query(query, id);

  return true;
}

async function findVenueEventIdOfUser(id) {
  const pool = await database.getPool();
  const query = "SELECT id_local_evento FROM local_evento WHERE id_usuario = ?";
  const [venueEvent] = await pool.query(query, id);

  return venueEvent[0];
}

async function updateVenueEventByUserId(data) {
  const { id_usuario, nombreLocalEvento, localizacion, descripcion } = data;

  const pool = await database.getPool();
  const updateQuery =
    "UPDATE local_evento SET nombre_local_evento = ?,localizacion = ?, descripcion = ? WHERE id_usuario = ?";
  await pool.query(updateQuery, [
    nombreLocalEvento,
    localizacion,
    descripcion,
    id_usuario,
  ]);

  return true;
}

async function insertVenueAndBandIntoContractTable(
  bandId,
  venueEventId,
  date,
  contract,
  venueEventName,
  bandName
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO es_contratado_banda (id_banda, id_local_evento, fecha, contrato,nombre_local_evento,nombre_banda) VALUES(?,?,?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    bandId,
    venueEventId,
    date,
    contract,
    venueEventName,
    bandName,
  ]);

  return created;
}

async function insertVenueAndMusicianIntoContractTable(
  musicianId,
  venueEventId,
  date,
  contract,
  venueEventName,
  musicianName
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO es_contratado_solista (id_solista, id_local_evento, fecha, contrato,nombre_local_evento,nombre_solista) VALUES(?,?,?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    musicianId,
    venueEventId,
    date,
    contract,
    venueEventName,
    musicianName,
  ]);

  return created;
}

async function findVenueEventIdByContractId(contractId) {
  const pool = await database.getPool();
  const query =
    "SELECT id_local_evento FROM es_contratado_banda WHERE id_contrato = ?";
  const [venueEventId] = await pool.query(query, contractId);

  return venueEventId[0];
}

async function findVenueEventIdByContractMusicianId(contractId) {
  const pool = await database.getPool();
  const query =
    "SELECT id_local_evento FROM es_contratado_solista WHERE id_contrato = ?";
  const [venueEventId] = await pool.query(query, contractId);

  return venueEventId[0];
}

async function findVenueEventUserIdByVenueEventId(venueEventId) {
  const pool = await database.getPool();
  const query = "SELECT id_usuario FROM local_evento WHERE id_local_evento = ?";
  const [userId] = await pool.query(query, venueEventId);

  return userId[0];
}

async function findAllMusicianContractRequests(venueId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM es_contratado_solista WHERE id_local_evento = ?";
  const [contracts] = await pool.query(query, venueId);

  return contracts;
}

async function findAllBandContractRequests(venueId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM es_contratado_banda WHERE id_local_evento = ?";
  const [contracts] = await pool.query(query, venueId);

  return contracts;
}

module.exports = {
  createVenueEvent,
  findAllBandContractRequests,
  findAllMusicianContractRequests,
  findAllVenuesEvents,
  findUserIdOfVenueEvent,
  findVenueEventById,
  findVenueEventByLocation,
  findVenueEventByName,
  findVenueEventIdOfUser,
  findVenueEventByUserId,
  findVenueEventIdByContractId,
  findVenueEventIdByContractMusicianId,
  findVenueEventUserIdByVenueEventId,
  insertVenueAndBandIntoContractTable,
  insertVenueAndMusicianIntoContractTable,
  removeVenueEventByUserId,
  updateVenueEventByUserId,
  findVenueEventNameById,
};
