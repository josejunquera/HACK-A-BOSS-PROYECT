"user strict";

const express = require("express");
const registerUser = require("../controllers/users/register-user");
const loginUser = require("../controllers/users/login-user");
const getUserById = require("../controllers/users/get-user-by-id");
const getUserByEmail = require("../controllers/users/get-user-by-email");

const deleteUserById = require("../controllers/users/delete-user-by-id");
const validateAuth = require("../middleware/validate-auth");
const updateUser = require("../controllers/users/update-user");
const updatePassword = require("../controllers/users/update-user-password");
const uploadImageProfile = require("../controllers/users/upload-image-profile");

const router = express.Router();

router.route("/register").post((req, res) => registerUser(req, res));
router.route("/login").post((req, res) => loginUser(req, res));
router.route("/:id").get((req, res) => getUserById(req, res));
router.route("/email/:email").get((req, res) => getUserByEmail(req, res));

router
  .route("/:id")
  .all(validateAuth)
  .delete((req, res) => deleteUserById(req, res));

router
  .route("/")
  .all(validateAuth)
  .put((req, res) => updateUser(req, res));

router
  .route("/update-password")
  .all(validateAuth)
  .put((req, res) => updatePassword(req, res));

router
  .route("/upload-profile-image")
  .all(validateAuth)
  .post((req, res) => uploadImageProfile(req, res));

module.exports = router;
