//Defines URL endpoints

const express = require('express');
const controller = require("./user.controller");

const router = express.Router();

router.post("/register", controller.register);

module.exports = router;