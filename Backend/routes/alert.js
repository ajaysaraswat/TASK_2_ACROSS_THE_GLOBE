const express = require("express");
const { handlepostAlert, handlegetalert } = require("../controllers/alert");
const alertRouter = express.Router();

alertRouter.post("/alert", handlepostAlert);
alertRouter.get("/alert/:symbol", handlegetalert);

module.exports = alertRouter;
