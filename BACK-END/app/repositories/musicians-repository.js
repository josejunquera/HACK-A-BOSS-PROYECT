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

async function findMusicianByUserID(userId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM solista WHERE id_usuario = ?";
  const [users] = await pool.query(query, userId);

  return users[0];
}
module.exports = { createMusician, findMusicianByUserID };
