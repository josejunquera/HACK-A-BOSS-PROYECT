"user strict";

const express = require("express");
const registerUser = require("../controllers/users/register-user");
const loginUser = require("../controllers/users/login-user");
const getUserById = require("../controllers/users/get-user-by-id");
const deleteUserById = require("../controllers/users/delete-user-by-id");
const validateAuth = require("../middleware/validate-auth");
const router = express.Router();

router.route("/register").post((req, res) => registerUser(req, res));
router.route("/login").post((req, res) => loginUser(req, res));
router.route("/:id").get((req, res) => getUserById(req, res));
router
  .route("/:id")
  .all(validateAuth)
  .delete((req, res) => deleteUserById(req, res));

module.exports = router;
