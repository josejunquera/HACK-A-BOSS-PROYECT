"use strict";

const Joi = require("joi");
const createJsonError = require("../errors/create-json-errors");
const path = require("path");
const fs = require("fs");

const {
  findMultimediaOfMusician,
  uploadMusicianMultimedia,
} = require("../../repositories/multimedia-repository");

const {
  findMusicianIdOfUser,
} = require("../../repositories/musicians-repository");

const validExtensions = [
  ".jpeg",
  ".jpg",
  ".png",
  ".mp4",
  ".mov",
  ".avi",
  ".mp3",
  ".aac",
  ".wav",
];

const schema = Joi.object().keys({
  titulo: Joi.string()
    .regex(/^[a-zA-Z0-9ñÑ!@#$%&*áéíóú]{3,25}$/)
    .required(),
});

async function uploadMusicianMedia(req, res) {
  try {
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const titulo = req.body.titulo;

    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("No se ha subido ningun archivo");
      error.status = 400;
      throw error;
    }

    const musicianMedia = req.files.musicianMedia;
    const extension = path.extname(musicianMedia.name);

    if (!validExtensions.includes(extension)) {
      const error = new Error("Formato no permitido");
      error.status = 400;
      throw error;
    }

    let tipo = null;

    if (extension === ".jpeg" || extension === ".jpg" || extension === ".png") {
      tipo = "imagen";
    } else if (
      extension === ".mp4" ||
      extension === ".mov" ||
      extension === ".avi"
    ) {
      tipo = "video";
    } else if (
      extension === ".mp3" ||
      extension === ".aac" ||
      extension === ".wav"
    ) {
      tipo = "audio";
    }

    const { HTTP_SERVER_DOMAIN, PATH_MUSICIAN_MEDIA } = process.env;

    const musicianId = await findMusicianIdOfUser(id_usuario);

    const existsUserMusicianMedia = await findMultimediaOfMusician(
      musicianId.id_solista,
      tipo,
      titulo
    );

    let dir = `${__dirname}/../../../../FRONT-END/music-hub/public/${PATH_MUSICIAN_MEDIA}/${"user"}${id_usuario}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const pathMusicianMediaFolder = `${__dirname}/../../../../FRONT-END/music-hub/public/${PATH_MUSICIAN_MEDIA}`;

    const pathMediaMusician = `${pathMusicianMediaFolder}/${"user"}${id_usuario}/${titulo}${extension}`;

    if (existsUserMusicianMedia) {
      const error = new Error(
        `Ya existe un archivo de tipo ${tipo} con el mismo nombre`
      );
      error.status = 409;
      throw error;
    }

    musicianMedia.mv(pathMediaMusician, async function (err) {
      if (err) return res.status(500).send(err);
      await uploadMusicianMultimedia(
        musicianId.id_solista,
        tipo,
        `${HTTP_SERVER_DOMAIN}/${PATH_MUSICIAN_MEDIA}/${titulo}${extension}`,
        titulo
      );

      res.send({
        message: "Tu archivo ha sido subido correctamente",
      });
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = uploadMusicianMedia;
