"use strict";
// const express = require("express");
// const fileUpload = require("express-fileupload");
const multer = require("multer");
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

    console.log(id_usuario);
    console.log(req.files);

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
    const user = await findUserProfileImage(id_usuario);
    const pathProfileImageFolder = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;

    // Borramos la imagen original
    if (user.image) {
      await fs.unlink(`${pathProfileImageFolder}/${user.image}`, () => {
        console.log("Borrada imagen de perfil correctamente");
      });
    }

    // Path de la nueva imagen de perfil
    const pathImage = `${pathProfileImageFolder}/${id}${extension}`;
    // Movemos la image a la ruta final /public/images/profiles/id.png
    profileImage.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      await uploadUserProfileImage(id_usuario, `${id_usuario}${extension}`);

      res.send({
        url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${id_usuario}${extension}`,
      });
    });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = uploadImageProfile;
