const axios = require("axios");

const handlegetCoinData = async (req, res) => {
	try {
		// Fetch data from the API
		const response = await axios.get(
			"https://api.coingecko.com/api/v3/coins/markets",
			{
				params: {
					vs_currency: "usd",
				},
			}
		);
		const coinsname = response.data.map((coin) => ({
			id: coin.id,
			symbol: coin.symbol,
			image: coin.image,
			name: coin.name,
			current_price: coin.current_price,
		}));
		// Send the data field from the response
		return res.status(200).json({
			cryptocurrencies: coinsname,
		});
	} catch (error) {
		// Handle errors gracefully
		console.error("Error fetching data from API:", error.message);
		return res.status(500).json({ error: "Failed to fetch data from API." });
	}
};

module.exports = {
	handlegetCoinData,
};
