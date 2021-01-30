"use strict";

const express = require("express");
const addMusician = require("../controllers/musicians/add-musician");
const getMusicians = require("../controllers/musicians/get-musicians");
const validateAuth = require("../middleware/validate-auth");
const getMusicianByLocation = require("../controllers/musicians/get-musicians-by-location");
const getMusicianBySpeciality = require("../controllers/musicians/get-musician-by-speciality");
const getMusicianByMovility = require("../controllers/musicians/get-musician-by-movility");
const getMusicianByName = require("../controllers/musicians/get-musician-by-name");

const router = express.Router();

router.route("/").get((req, res) => getMusicians(req, res));

router
  .route("/location/:location")
  .get((req, res) => getMusicianByLocation(req, res));

router
  .route("/speciality/:speciality")
  .get((req, res) => getMusicianBySpeciality(req, res));

router
  .route("/movility/:movility")
  .get((req, res) => getMusicianByMovility(req, res));

router.route("/name/:name").get((req, res) => getMusicianByName(req, res));

router
  .route("/add")
  .all(validateAuth)
  .post((req, res) => addMusician(req, res));

module.exports = router;
