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

module.exports = {
  createVenueEvent,
  findVenueEventById,
  findAllVenuesEvents,
  findVenueEventByName,
  findVenueEventByLocation,
  findUserIdOfVenueEvent,
  findVenueEventByUserId,
  findVenueEventIdOfUser,
  updateVenueEventByUserId,
  removeVenueEventByUserId,
};
