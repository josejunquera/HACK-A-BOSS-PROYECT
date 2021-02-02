"use strict";

const express = require("express");
const validateAuth = require("../middleware/validate-auth");

const addVenueEvent = require("../controllers/venues-events/add-venue-event");
const deleteVenueEventByUserId = require("../controllers/venues-events/delete-venue-event-by-user-id");
const getVenuesEvents = require("../controllers/venues-events/get-venues-events");
const getVenueEventByLocation = require("../controllers/venues-events/get-venue-event-by-location");
const getVenueEventByName = require("../controllers/venues-events/get-venue-event-by-name");
const updateVenueEvent = require("../controllers/venues-events/update-venue-event");

const router = express.Router();

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
  .route("/")
  .all(validateAuth)
  .put((req, res) => updateVenueEvent(req, res));

module.exports = router;
