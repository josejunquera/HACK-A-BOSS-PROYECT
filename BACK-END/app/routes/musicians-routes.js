"use strict";

const express = require("express");
const addMusician = require("../controllers/musicians/add-musician");

const router = express.Router();

router.route("/musicians/add").post((req, res) => addMusician(req, res));

module.exports = router;
