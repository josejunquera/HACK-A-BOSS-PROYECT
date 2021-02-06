"use strict";

const database = require("../infrastructure/database");

async function findMultimediaOfBand(bandId, type, title) {
  const pool = await database.getPool();
  const query =
    "SELECT url FROM multimedia_banda WHERE id_banda = ? AND tipo=? AND titulo=?";
  const [url] = await pool.query(query, [bandId, type, title]);

  return url[0];
}

async function uploadBandMultimedia(bandId, type, url, title) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO multimedia_banda (id_banda,tipo,url,titulo)VALUES(?,?,?,?)";
  const [created] = await pool.query(insertQuery, [bandId, type, url, title]);

  return created.insertId;
}

module.exports = { findMultimediaOfBand, uploadBandMultimedia };
