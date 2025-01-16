const express = require("express");
const axios = require("axios");
const { handlegetalldata, handlegetCoinData } = require("../controllers/coin");
const router = express.Router();

router.get("/", handlegetCoinData);
router.get("/curr", handlegetalldata);

module.exports = router;
