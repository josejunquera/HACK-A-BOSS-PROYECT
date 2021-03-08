"use strict";

const database = require("../infrastructure/database");

async function findMultimediaOfBand(bandId, type, title) {
  const pool = await database.getPool();
  const query =
    "SELECT url FROM multimedia_banda WHERE id_banda = ? AND tipo=? AND titulo=?";
  const [url] = await pool.query(query, [bandId, type, title]);

  return url[0];
}

async function findCoverImageOfMusician(idSolista, titulo) {
  const pool = await database.getPool();
  const query =
    "SELECT url FROM multimedia_solista WHERE id_solista = ? AND titulo = ?";
  const [url] = await pool.query(query, [idSolista, titulo]);

  return url[0];
}

async function findCoverImageOfBand(idBanda, titulo) {
  const pool = await database.getPool();
  const query =
    "SELECT url FROM multimedia_banda WHERE id_banda = ? AND titulo = ?";
  const [url] = await pool.query(query, [idBanda, titulo]);

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

async function findMusicianMedia(musicianId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM multimedia_solista WHERE id_solista = ?";
  const [media] = await pool.query(query, musicianId);

  return media;
}

async function findMusicianMediaByType(musicianId, type) {
  const pool = await database.getPool();
  const query =
    "SELECT * FROM multimedia_solista WHERE id_solista = ? AND tipo = ? ";
  const [media] = await pool.query(query, [musicianId, type]);

  return media;
}

async function findBandMedia(bandId) {
  const pool = await database.getPool();
  const query = "SELECT * FROM multimedia_banda WHERE id_banda = ?";
  const [media] = await pool.query(query, bandId);

  return media;
}

async function findBandMediaByType(bandId, type) {
  const pool = await database.getPool();
  const query =
    "SELECT * FROM multimedia_banda WHERE id_banda = ? AND tipo = ? ";
  const [media] = await pool.query(query, [bandId, type]);

  return media;
}
async function findMusicianMediaByMusicianIdandMediaId(mediaId, musicianId) {
  const pool = await database.getPool();
  const query =
    "SELECT * FROM multimedia_solista WHERE id_multimedia = ? AND id_solista = ?";
  const [media] = await pool.query(query, [mediaId, musicianId]);

  return media;
}

async function removeMusicianMediaById(mediaId) {
  const pool = await database.getPool();
  const query = "DELETE FROM multimedia_solista WHERE id_multimedia = ? ";
  await pool.query(query, mediaId);

  return true;
}

async function findBandMediaByBandIdandMediaId(mediaId, bandId) {
  const pool = await database.getPool();
  const query =
    "SELECT * FROM multimedia_banda WHERE id_multimedia = ? AND id_banda = ?";
  const [media] = await pool.query(query, [mediaId, bandId]);

  return media;
}

async function removeBandMediaById(mediaId) {
  const pool = await database.getPool();
  const query = "DELETE FROM multimedia_banda WHERE id_multimedia = ? ";
  await pool.query(query, mediaId);

  return true;
}

module.exports = {
  findBandMedia,
  findCoverImageOfBand,
  findCoverImageOfMusician,
  findMusicianMedia,
  findBandMediaByType,
  findBandMediaByBandIdandMediaId,
  findMusicianMediaByMusicianIdandMediaId,
  findMusicianMediaByType,
  findMultimediaOfBand,
  findMultimediaOfMusician,
  removeBandMediaById,
  removeMusicianMediaById,
  uploadBandMultimedia,
  uploadMusicianMultimedia,
};
