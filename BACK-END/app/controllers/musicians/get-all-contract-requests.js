"use strict";

const {
  findMusicianIdOfUser,
  findAllContractRequests,
} = require("../../repositories/musicians-repository");

const createJsonError = require("../errors/create-json-errors");

async function getAllContractRequests(req, res) {
  try {
    const { id_usuario } = req.auth;

    const musicianId = await findMusicianIdOfUser(id_usuario);

    const contracts = await findAllContractRequests(musicianId.id_solista);

    if (!contracts[0]) {
      const error = new Error("No tienes solicitudes de contratación");
      error.status = 403;
      throw error;
    }

    await res.send(contracts);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getAllContractRequests;
