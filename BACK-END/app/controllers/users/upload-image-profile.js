"use strict";

const createJsonError = require("../errors/create-json-errors");
const path = require("path");
const fs = require("fs");

const {
  findUserProfileImage,
  uploadUserProfileImage,
} = require("../../repositories/users-repository");

const validExtensions = [".jpeg", ".jpg", ".png"];

async function uploadImageProfile(req, res) {
  try {
    const { id_usuario } = req.auth;

    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("No se ha subido ningun archivo");
      error.status = 400;
      throw error;
    }

    const profileImage = req.files.profileImage;
    const extension = path.extname(profileImage.name);

    if (!validExtensions.includes(extension)) {
      const error = new Error("Formato no permitido");
      error.status = 400;
      throw error;
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;

    const userProfileImage = await findUserProfileImage(id_usuario);
    const pathProfileImageFolder = `${__dirname}/../../../../FRONT-END/music-hub/public/${PATH_USER_IMAGE}`;

    if (userProfileImage.imagen_perfil) {
      await fs.unlink(
        `${pathProfileImageFolder}/${userProfileImage.imagen_perfil}`,
        () => {
          console.log("Borrada imagen de perfil correctamente");
        }
      );
    }

    const pathImage = `${pathProfileImageFolder}/${id_usuario}${extension}`;

    profileImage.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      await uploadUserProfileImage(
        id_usuario,
        `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${id_usuario}${extension}`
      );

      res.send({
        url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${id_usuario}${extension}`,
      });
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = uploadImageProfile;
