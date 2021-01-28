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
  const insertQuery =
    "INSERT INTO solista(id_usuario,busco_banda,busco_actuacion,localizacion,especialidad,movilidad,descripcion,nombre_solista) VALUES (?,?,?,?,?,?,?)";
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

module.exports = { createMusician };
