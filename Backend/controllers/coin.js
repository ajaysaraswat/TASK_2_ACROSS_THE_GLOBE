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
			name: coin.name,
			id: coin.id,
		}));
		// Send the data field from the response
		return res.json({ response: coinsname });
	} catch (error) {
		// Handle errors gracefully
		console.error("Error fetching data from API:", error.message);
		return res.status(500).json({ error: "Failed to fetch data from API." });
	}
};

module.exports = {
	handlegetCoinData,
};
