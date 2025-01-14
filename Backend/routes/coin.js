const express = require("express");
const axios = require("axios");
const { handlegetCoinData } = require("../controllers/coin");
const router = express.Router();

router.get("/", handlegetCoinData);

module.exports = router;
