"use strict";

const database = require("../infrastructure/database");

async function findMultimediaOfBand(bandId, type, title) {
  const pool = await database.getPool();
  const query =
    "SELECT url FROM multimedia_banda WHERE id_banda = ? AND tipo=? AND titulo=?";
  const [url] = await pool.query(query, [bandId, type, title]);

  return url[0];
}

async function findMultimediaOfMusician(musicianId, type, title) {
  const pool = await database.getPool();
  const query =
    "SELECT url FROM multimedia_solista WHERE id_solista = ? AND tipo=? AND titulo=?";
  const [url] = await pool.query(query, [musicianId, type, title]);

  return url[0];
}

async function uploadBandMultimedia(bandId, type, url, title) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO multimedia_banda (id_banda,tipo,url,titulo)VALUES(?,?,?,?)";
  const [created] = await pool.query(insertQuery, [bandId, type, url, title]);

  return created.insertId;
}

async function uploadMusicianMultimedia(musicianId, type, url, title) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO multimedia_solista (id_solista,tipo,url,titulo)VALUES(?,?,?,?)";
  const [created] = await pool.query(insertQuery, [
    musicianId,
    type,
    url,
    title,
  ]);

  return created.insertId;
}

module.exports = {
  findMultimediaOfBand,
  findMultimediaOfMusician,
  uploadBandMultimedia,
  uploadMusicianMultimedia,
};
