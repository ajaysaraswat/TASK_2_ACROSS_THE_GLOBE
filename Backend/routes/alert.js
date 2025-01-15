const express = require("express");
const { handlepostAlert } = require("../controllers/alert");
const alertRouter = express.Router();

alertRouter.post("/alert", handlepostAlert);

module.exports = alertRouter;
