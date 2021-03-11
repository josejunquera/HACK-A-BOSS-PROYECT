"use strict";

const express = require("express");
const validateAuth = require("../middleware/validate-auth");

const addVenueEvent = require("../controllers/venues-events/add-venue-event");
const deleteVenueEventByUserId = require("../controllers/venues-events/delete-venue-event-by-user-id");
const getVenuesEvents = require("../controllers/venues-events/get-venues-events");
const getVenueEventByLocation = require("../controllers/venues-events/get-venue-event-by-location");
const getVenueEventByName = require("../controllers/venues-events/get-venue-event-by-name");
const updateVenueEvent = require("../controllers/venues-events/update-venue-event");
const contractBand = require("../controllers/venues-events/contract-band");
const contractMusician = require("../controllers/venues-events/contract-musician");
const getAllContractRequest = require("../controllers/venues-events/get-all-contract-requests");
const getVenueEventByUserId = require("../controllers/venues-events/get-venue-event-by-user-id");
const getVenueEventNameById = require("../controllers/venues-events/get-venue-event-name");

const router = express.Router();

router
  .route("/get-venue-event")
  .all(validateAuth)
  .get((req, res) => getVenueEventByUserId(req, res));

router
  .route("/add")
  .all(validateAuth)
  .post((req, res) => addVenueEvent(req, res));

router
  .route("/:id")
  .all(validateAuth)
  .delete((req, res) => deleteVenueEventByUserId(req, res));

router.route("/").get((req, res) => getVenuesEvents(req, res));

router
  .route("/location/:location")
  .get((req, res) => getVenueEventByLocation(req, res));

router.route("/name/:name").get((req, res) => getVenueEventByName(req, res));

router
  .route("/get-venue-event-name/:idVenueEvent")
  .get((req, res) => getVenueEventNameById(req, res));

router
  .route("/")
  .all(validateAuth)
  .put((req, res) => updateVenueEvent(req, res));

router
  .route("/contracts")
  .all(validateAuth)
  .get((req, res) => getAllContractRequest(req, res));

router
  .route("/contract-band")
  .all(validateAuth)
  .post((req, res) => contractBand(req, res));

router
  .route("/contract-musician")
  .all(validateAuth)
  .post((req, res) => contractMusician(req, res));

module.exports = router;
