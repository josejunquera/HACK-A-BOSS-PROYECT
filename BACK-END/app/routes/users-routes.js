"user strict";

const express = require("express");
const registerUser = require("../controllers/users/register-user");
const router = express.Router();

router.route("/register").post((req, res) => registerUser(req, res));

module.exports = router;
