"use strict";

const Joi = require("joi");
const fs = require("fs");
const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");

const {
  findMusicianMediaByMusicianIdandMediaId,
  removeMusicianMediaById,
} = require("../../repositories/multimedia-repository");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive();

async function deleteMusicianMedia(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { id } = req.params;

    await schema.validateAsync(id);

    const musicianId = await findMusicianIdOfUser(id_usuario);

    const existsMultimedia = await findMusicianMediaByMusicianIdandMediaId(
      id,
      musicianId.id_solista
    );

    if (!existsMultimedia[0]) {
      const error = new Error(
        "No existen archivos multimedia con el ID indicado para tu usuario"
      );
      error.status = 400;
      throw error;
    }
    const urlMedia = existsMultimedia[0].url;

    const nameAndExtension = urlMedia.split("/").pop();

    await removeMusicianMediaById(id);

    const { PATH_MUSICIAN_MEDIA } = process.env;

    await fs.unlink(
      `${__dirname}/../../../../FRONT-END/music-hub/public/${PATH_MUSICIAN_MEDIA}/${"user"}${id_usuario}/${nameAndExtension}`,
      () => {
        console.log("El archivo ha sido borrado correctamente");
      }
    );

    await res.send({
      message: `El archivo multimedia con id: ${id} ha sido borrado`,
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteMusicianMedia;
