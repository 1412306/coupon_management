const express = require("express");
const router = express.Router();
const path = require("path");
const AuthenticationController = require(path.resolve("./src/api/authentication/authentication.controller"));

router.post("/login", AuthenticationController.login);
router.post("/register", AuthenticationController.register);

module.exports = router;
