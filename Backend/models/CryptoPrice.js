const mongoose = require("mongoose");

const cryptoPriceSchema = new mongoose.Schema({
	image: { type: String, required: true }, // URL or path to the image
	name: { type: String, required: true }, // Full name of the cryptocurrency
	symbol: { type: String, required: true, unique: true }, // Cryptocurrency symbol (e.g., BTC, ETH)
	currentPrice: { type: Number, required: true }, // Current price in USD
	timestamp: { type: Date, default: Date.now }, // Time of the price update
});

const CryptoPrice = mongoose.model("CryptoPrice", cryptoPriceSchema);

module.exports = CryptoPrice;
