"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { findUserByEmail } = require("../../repositories/users-repository");
const createJsonError = require("../errors/create-json-errors");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(100).required(),
});

async function loginUser(req, res) {
  try {
    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      const error = new Error("El usuario/password no es correcto");
      error.status = 403;
      throw error;
    }
    const isValidPassword = await bcrypt.compare(password, user.contrasena);
    if (!isValidPassword) {
      const error = new Error("El usuario/password no es correcto");
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const { id_usuario, nombre_usuario, rol } = user;
    const jwtTokenExpiration = "40h";
    const payload = {
      id_usuario,
      nombre_usuario,
      rol,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const response = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.send(response);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = loginUser;
