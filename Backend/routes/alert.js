const express = require("express");
const { handlepostAlert } = require("../controllers/alert");
const alertRouter = express.Router();

alertRouter("/alert", handlepostAlert);

module.exports = alertRouter;
