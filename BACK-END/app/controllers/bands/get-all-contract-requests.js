"use strict";

const {
  findBandIdOfUser,
  findAllContractRequests,
} = require("../../repositories/bands-repository");

const createJsonError = require("../errors/create-json-errors");

async function getAllContractRequests(req, res) {
  try {
    const { id_usuario } = req.auth;

    const bandId = await findBandIdOfUser(id_usuario);

    const contracts = await findAllContractRequests(bandId.id_banda);

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
