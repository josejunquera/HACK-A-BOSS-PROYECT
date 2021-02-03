"use strict";

const express = require("express");
const addMusician = require("../controllers/musicians/add-musician");
const getMusicians = require("../controllers/musicians/get-musicians");
const validateAuth = require("../middleware/validate-auth");
const getMusicianByLocation = require("../controllers/musicians/get-musician-by-location");
const getMusicianBySpeciality = require("../controllers/musicians/get-musician-by-speciality");
const getMusicianByMovility = require("../controllers/musicians/get-musician-by-movility");
const getMusicianByName = require("../controllers/musicians/get-musician-by-name");
const getMusicianByLookingForBand = require("../controllers/musicians/get-musician-by-lookingForBand");
const getMusicianByLookingForGig = require("../controllers/musicians/get-musician-by-lookingForGig");
const deleteMusicianByUserId = require("../controllers/musicians/delete-musician-by-user-id");
const updateMusician = require("../controllers/musicians/update-musician");
const addGenreToMusician = require("../controllers/musicians/add-genre");
const deleteGenreToMusician = require("../controllers/musicians/delete-genre");
const getMusicianByGenre = require("../controllers/musicians/get-musician-by-genre");
const getMusiciansWithGenre = require("../controllers/musicians/get-musicians-with-genre");

const router = express.Router();

router.route("/").get((req, res) => getMusicians(req, res));

router.route("/withgenres").get((req, res) => getMusiciansWithGenre(req, res));

router
  .route("/location/:location")
  .get((req, res) => getMusicianByLocation(req, res));

router
  .route("/speciality/:speciality")
  .get((req, res) => getMusicianBySpeciality(req, res));

router
  .route("/movility/:movility")
  .get((req, res) => getMusicianByMovility(req, res));

router
  .route("/lookingforband/:response")
  .get((req, res) => getMusicianByLookingForBand(req, res));

router
  .route("/lookingforgig/:response")
  .get((req, res) => getMusicianByLookingForGig(req, res));

router.route("/name/:name").get((req, res) => getMusicianByName(req, res));

router.route("/genre/:genre").get((req, res) => getMusicianByGenre(req, res));

router
  .route("/add")
  .all(validateAuth)
  .post((req, res) => addMusician(req, res));

router
  .route("/:id")
  .all(validateAuth)
  .delete((req, res) => deleteMusicianByUserId(req, res));

router
  .route("/")
  .all(validateAuth)
  .put((req, res) => updateMusician(req, res));

router
  .route("/addgenre")
  .all(validateAuth)
  .post((req, res) => addGenreToMusician(req, res));

router
  .route("/")
  .all(validateAuth)
  .delete((req, res) => deleteGenreToMusician(req, res));

module.exports = router;
