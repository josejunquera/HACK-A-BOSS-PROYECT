"use strict";

const {
  findVenueEventIdOfUser,
  findAllMusicianContractRequests,
  findAllBandContractRequests,
} = require("../../repositories/venues-events-repository");

const createJsonError = require("../errors/create-json-errors");

async function getAllContractRequests(req, res) {
  try {
    const { id_usuario } = req.auth;

    const venueEventId = await findVenueEventIdOfUser(id_usuario);

    const musicianContracts = await findAllMusicianContractRequests(
      venueEventId.id_local_evento
    );

    const bandContracts = await findAllBandContractRequests(
      venueEventId.id_local_evento
    );

    if (!musicianContracts[0] && !bandContracts[0]) {
      const error = new Error("No existen solicitudes de contratación");
      error.status = 403;
      throw error;
    }

    await res.send({ musicianContracts, bandContracts });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = getAllContractRequests;
