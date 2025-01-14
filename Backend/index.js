const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 8000;

app.get("/", async (req, res) => {
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
		// Send the data field from the response
		return res.json({ response: response.data });
	} catch (error) {
		// Handle errors gracefully
		console.error("Error fetching data from API:", error.message);
		return res.status(500).json({ error: "Failed to fetch data from API." });
	}
});

app.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
