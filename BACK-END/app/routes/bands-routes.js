"use strict";
const express = require("express");
const validateAuth = require("../middleware/validate-auth");

const addBand = require("../controllers/bands/add-band");
const deleteBandByUserId = require("../controllers/bands/delete-band-by-user-id");
const getBandByLocation = require("../controllers/bands/get-band-by-location");
const getBandByLookingForMusician = require("../controllers/bands/get-band-by-lookingForMusician");
const getBandByLookingForGig = require("../controllers/bands/get-band-by-lookingForGig");
const getBandByMovility = require("../controllers/bands/get-band-by-movility");
const getBands = require("../controllers/bands/get-bands");
const updateBand = require("../controllers/bands/update-band");
const getBandByName = require("../controllers/bands/get-band-by-name");
const addGenreToBand = require("../controllers/bands/add-genre");
const deleteGenreToBand = require("../controllers/bands/delete-genre");
const getBandByGenre = require("../controllers/bands/get-band-by-genre");
const contactToMusician = require("../controllers/bands/contact-band-to-musician");
const getAllContractRequests = require("../controllers/bands/get-all-contract-requests");
const replyContractRequest = require("../controllers/bands/reply-contract-request-by-request-id");
const getBandsWithGenre = require("../controllers/bands/get-bands-with-genre");
const uploadBandMedia = require("../controllers/bands/upload-band-media");
const getBandMedia = require("../controllers/bands/get-band-media");
const getBandByUserId = require("../controllers/bands/get-band-by-user-id");
const deleteBandMedia = require("../controllers/bands/delete-band-media");
const getBandMediaByType = require("../controllers/bands/get-band-media-by-type");
const getBandGenres = require("../controllers/bands/get-all-band-genres");
const getCoverImageOfBand = require("../controllers/multimedia/get-band-cover-image");
const getBandGenresParams = require("../controllers/bands/get-all-band-genres-params");
const getBandByUserIdParams = require("../controllers/bands/get-band-by-user-id-params");
const getBandMediaParams = require("../controllers/bands/get-band-media-params");

const router = express.Router();

router.route("/").get((req, res) => getBands(req, res));

router.route("/withgenres").get((req, res) => getBandsWithGenre(req, res));

router
  .route("/get-band-genres")
  .all(validateAuth)
  .get((req, res) => getBandGenres(req, res));

router
  .route("/get-band-genres/:id_usuario")
  .get((req, res) => getBandGenresParams(req, res));

router
  .route("/get-cover-image/:idBanda")
  .get((req, res) => getCoverImageOfBand(req, res));

router
  .route("/get-band/:id_usuario")
  .get((req, res) => getBandByUserIdParams(req, res));

router
  .route("/get-media/:id_usuario")
  .get((req, res) => getBandMediaParams(req, res));

router
  .route("/contracts")
  .all(validateAuth)
  .get((req, res) => getAllContractRequests(req, res));

router
  .route("/delete-media/:id")
  .all(validateAuth)
  .delete((req, res) => deleteBandMedia(req, res));

router
  .route("/get-media")
  .all(validateAuth)
  .get((req, res) => getBandMedia(req, res));

router
  .route("/get-media-by-type/:tipo")
  .all(validateAuth)
  .get((req, res) => getBandMediaByType(req, res));

router
  .route("/upload-media")
  .all(validateAuth)
  .post((req, res) => uploadBandMedia(req, res));

router
  .route("/contract-reply")
  .all(validateAuth)
  .post((req, res) => replyContractRequest(req, res));

router
  .route("/contact-musician")
  .all(validateAuth)
  .post((req, res) => contactToMusician(req, res));

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

router.route("/genre/:genre").get((req, res) => getBandByGenre(req, res));

router
  .route("/")
  .all(validateAuth)
  .put((req, res) => updateBand(req, res));

router
  .route("/get-band")
  .all(validateAuth)
  .get((req, res) => getBandByUserId(req, res));

router
  .route("/addgenre")
  .all(validateAuth)
  .post((req, res) => addGenreToBand(req, res));

router
  .route("/")
  .all(validateAuth)
  .delete((req, res) => deleteGenreToBand(req, res));

module.exports = router;
