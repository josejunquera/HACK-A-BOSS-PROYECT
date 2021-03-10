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
const contactToBand = require("../controllers/musicians/contact-musician-to band");
const getAllContractRequests = require("../controllers/musicians/get-all-contract-requests");
const replyContractRequest = require("../controllers/musicians/reply-contract-request-by-request-id");
const uploadMusicianMedia = require("../controllers/musicians/upload-musicians-media");
const getMusicianMedia = require("../controllers/musicians/get-musician-media");
const deleteMusicianMedia = require("../controllers/musicians/delete-musician-media");
const getMusicianByUserId = require("../controllers/musicians/get-musician-bu-user-id");
const getMusicianMediaByType = require("../controllers/musicians/get-musician-media-by-type");
const getAllGenres = require("../controllers/multimedia/get-all-genres");
const getMusicianGenres = require("../controllers/musicians/get-all-musician-genres");
const getCoverImageOfMusician = require("../controllers/multimedia/get-musician-cover-image");
const getMusicianGenresParams = require("../controllers/musicians/get-all-musician-genres-params");
const getMusicianByUserIdParams = require("../controllers/musicians/get-musician-by-user-id-params");
const getMusicianMediaParams = require("../controllers/musicians/get-musician-media-params");

const router = express.Router();

router.route("/").get((req, res) => getMusicians(req, res));

router.route("/withgenres").get((req, res) => getMusiciansWithGenre(req, res));

router.route("/get-genres").get((req, res) => getAllGenres(req, res));

router
  .route("/get-musician-genres")
  .all(validateAuth)
  .get((req, res) => getMusicianGenres(req, res));

router
  .route("/get-musician-genres/:id_usuario")
  .get((req, res) => getMusicianGenresParams(req, res));

router
  .route("/contracts")
  .all(validateAuth)
  .get((req, res) => getAllContractRequests(req, res));

router
  .route("/get-media")
  .all(validateAuth)
  .get((req, res) => getMusicianMedia(req, res));

router
  .route("/get-media/:id_usuario")
  .get((req, res) => getMusicianMediaParams(req, res));

router
  .route("/get-media-by-type/:tipo")
  .all(validateAuth)
  .get((req, res) => getMusicianMediaByType(req, res));

router
  .route("/delete-media/:id")
  .all(validateAuth)
  .delete((req, res) => deleteMusicianMedia(req, res));

router
  .route("/upload-media")
  .all(validateAuth)
  .post((req, res) => uploadMusicianMedia(req, res));

router
  .route("/contract-reply")
  .all(validateAuth)
  .post((req, res) => replyContractRequest(req, res));

router
  .route("/contact-band")
  .all(validateAuth)
  .post((req, res) => contactToBand(req, res));

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
  .route("/get-cover-image/:idSolista")
  .get((req, res) => getCoverImageOfMusician(req, res));

router
  .route("/get-musician")
  .all(validateAuth)
  .get((req, res) => getMusicianByUserId(req, res));

router
  .route("/get-musician/:id_usuario")
  .get((req, res) => getMusicianByUserIdParams(req, res));

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
