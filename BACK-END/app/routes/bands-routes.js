"use strict";
const express = require("express");
const validateAuth = require("../middleware/validate-auth");

const addBand = require("../controllers/bands/add-band");
const deleteBandByUserId = require("../controllers/bands/delete-band-by-user-id");
const getBandByLocation = require("../controllers/bands/get-band-by-location");
const getBandByLookingForMusician = require("../controllers/bands/get-band-by-lookingForMusician");
const getBandByLookingForGig = require("../controllers/bands/get-band-by-lookingForGig");
const getBandByMovility = require("../controllers/bands/get-band-by-movility");
const getBandByName = require("../controllers/bands/get-band-by-name");

const router = express.Router();

router
  .route("/add")
  .all(validateAuth)
  .post((req, res) => addBand(req, res));

router
  .route("/:id")
  .all(validateAuth)
  .delete((req, res) => deleteBandByUserId(req, res));

router
  .route("/location/:location")
  .get((req, res) => getBandByLocation(req, res));

router
  .route("/lookingformusician/:response")
  .get((req, res) => getBandByLookingForMusician(req, res));

router
  .route("/lookingforgig/:response")
  .get((req, res) => getBandByLookingForGig(req, res));

router
  .route("/movility/:movility")
  .get((req, res) => getBandByMovility(req, res));

router.route("/name/:name").get((req, res) => getBandByName(req, res));

module.exports = router;
