"use strict";

const express = require("express");
const addMusician = require("../controllers/musicians/add-musician");
const validateAuth = require("../middleware/validate-auth");

const router = express.Router();

router
  .route("/musicians/add")
  .all(validateAuth)
  .post((req, res) => addMusician(req, res));

module.exports = router;
