"use strict";

const Joi = require("joi");
const createJsonError = require("../errors/create-json-errors");
const path = require("path");
const fs = require("fs");

const {
  findMultimediaOfBand,
  uploadBandMultimedia,
} = require("../../repositories/multimedia-repository");

const { findBandIdOfUser } = require("../../repositories/bands-repository");

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

async function uploadBandMedia(req, res) {
  try {
    const { id_usuario } = req.auth;

    await schema.validateAsync(req.body);

    const titulo = req.body.titulo;

    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("No se ha subido ningun archivo");
      error.status = 400;
      throw error;
    }

    const bandMedia = req.files.bandMedia;
    const extension = path.extname(bandMedia.name);

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

    const { HTTP_SERVER_DOMAIN, PATH_BAND_MEDIA } = process.env;

    const bandId = await findBandIdOfUser(id_usuario);

    const existsUserBandMedia = await findMultimediaOfBand(
      bandId.id_banda,
      tipo,
      titulo
    );

    let dir = `${__dirname}/../../../../FRONT-END/music-hub/public/${PATH_BAND_MEDIA}/${"user"}${id_usuario}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const pathBandMediaFolder = `${__dirname}/../../../../FRONT-END/music-hub/public/${PATH_BAND_MEDIA}`;

    const pathMediaBand = `${pathBandMediaFolder}/${"user"}${id_usuario}/${titulo}${extension}`;

    if (existsUserBandMedia) {
      const error = new Error(
        `Ya existe un archivo de tipo ${tipo} con el mismo nombre`
      );
      error.status = 409;
      throw error;
    }

    bandMedia.mv(pathMediaBand, async function (err) {
      if (err) return res.status(500).send(err);
      await uploadBandMultimedia(
        bandId.id_banda,
        tipo,
        `${HTTP_SERVER_DOMAIN}/${PATH_BAND_MEDIA}/${titulo}${extension}`,
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

module.exports = uploadBandMedia;
