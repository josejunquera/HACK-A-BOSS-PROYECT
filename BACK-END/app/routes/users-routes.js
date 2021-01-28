"user strict";

const express = require("express");
const registerUser = require("../controllers/users/register-user");
const loginUser = require("../controllers/users/login-user");
const router = express.Router();

router.route("/register").post((req, res) => registerUser(req, res));
router.route("/login").post((req, res) => loginUser(req, res));

module.exports = router;
