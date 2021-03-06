"use strict";

const Joi = require("joi");
const fs = require("fs");
const { findBandIdOfUser } = require("../../repositories/bands-repository");

const {
  findBandMediaByBandIdandMediaId,
  removeBandMediaById,
} = require("../../repositories/multimedia-repository");

const createJsonError = require("../errors/create-json-errors");

const schema = Joi.number().positive();

async function deleteBandMedia(req, res) {
  try {
    const { id_usuario } = req.auth;
    const { id } = req.params;

    await schema.validateAsync(id);

    const bandId = await findBandIdOfUser(id_usuario);

    const existsMultimedia = await findBandMediaByBandIdandMediaId(
      id,
      bandId.id_banda
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

    await removeBandMediaById(id);

    const { PATH_BAND_MEDIA } = process.env;

    await fs.unlink(
      `${__dirname}/../../../../FRONT-END/music-hub/public/${PATH_BAND_MEDIA}/${"user"}${id_usuario}/${nameAndExtension}`,
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

module.exports = deleteBandMedia;
