const CryptoPrice = require("../models/CryptoPrice");
const client = require("../Redis/client");

const handlegetCoinData = (req, res) => {
	return res.render("home");
};

const handlegetalldata = async (req, res) => {
	const cacheValue = await client.get("coinsprice");
	if (cacheValue) {
		console.log("yes cached data");
		return res.json(JSON.parse(cacheValue));
	}
	console.log("no cached data");
	const data = await CryptoPrice.find({});
	await client.set("coinsprice", JSON.stringify(data));
	await client.expire("coinsprice", 30);
	return res.json(data);
};

module.exports = {
	handlegetalldata,
	handlegetCoinData,
};
