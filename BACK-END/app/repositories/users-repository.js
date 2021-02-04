"use strict";

const database = require("../infrastructure/database");

async function createUser(
  nombreUsuario,
  nombre,
  apellido,
  email,
  passwordHash,
  role
) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO usuario (nombre_usuario, nombre, apellido, email, contrasena, rol) VALUES(?, ?, ?, ?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
    nombreUsuario,
    nombre,
    apellido,
    email,
    passwordHash,
    role,
  ]);

  return created.insertId;
}

async function findUserByEmail(email) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE email = ?";
  const [users] = await pool.query(query, email);

  return users[0];
}

async function findEmailByUser(id) {
  const pool = await database.getPool();
  const query = "SELECT email FROM usuario WHERE id_usuario = ?";
  const [email] = await pool.query(query, id);

  return email;
}

async function findUserById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM usuario WHERE id_usuario = ?";
  const [users] = await pool.query(query, id);

  return users[0];
}

async function removeUserById(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM usuario WHERE id_usuario = ?";
  await pool.query(query, id);

  return true;
}

async function updateUserById(data) {
  const {
    id_usuario,
    nombreUsuario,
    nombre,
    apellido,
    email,
    contrasena,
  } = data;

  const pool = await database.getPool();
  const updateQuery =
    "UPDATE usuario SET nombre = ?, apellido = ?, nombre_usuario = ?, email = ?, contrasena = ? WHERE id_usuario = ?";
  await pool.query(updateQuery, [
    nombre,
    apellido,
    nombreUsuario,
    email,
    contrasena,
    id_usuario,
  ]);

  return true;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  removeUserById,
  updateUserById,
  findEmailByUser,
};
