// // socketHandler.js

// const WebSocket = require("ws");
// require("dotenv").config();
// const { cryptoNames, cryptoImages } = require("./assests/coin");

// function handleSocketConnection(io) {
// 	io.on("connection", (socket) => {
// 		console.log("Socket connected");

// 		// Create a single WebSocket connection to Binance for all 20 pairs
// 		const binanceSocket = new WebSocket(process.env.BINANCE_WS_URL);

// 		binanceSocket.on("open", () => {
// 			console.log("Connected to Binance WebSocket for multiple currencies");
// 		});

// 		binanceSocket.on("message", (message) => {
// 			const tradeData = JSON.parse(message);
// 			//console.log("Trade Data:", tradeData); // Check if the data is correct

// 			const streamName = tradeData.stream; // stream name to identify which symbol
// 			const symbol = streamName.split("@")[0].toUpperCase(); // Extract symbol (e.g., btcusdt, ethusdt)

// 			// Prepare data for sending to the frontend
// 			const formattedData = [
// 				{
// 					price: parseFloat(tradeData.data.p), // Current trade price
// 					quantity: tradeData.data.q, // Trade quantity
// 					time: tradeData.data.T, // Trade time
// 					symbol: symbol, // Symbol (e.g., BTCUSDT, ETHUSDT)
// 					name: cryptoNames[symbol], // Name based on the symbol
// 					image: cryptoImages[symbol], // Image URL based on the symbol
// 				},
// 			];

// 			// Emit the data to the client
// 			socket.emit("cryptoPrices", formattedData);
// 		});

// 		binanceSocket.on("close", () => {
// 			console.log("Binance WebSocket disconnected");
// 		});

// 		binanceSocket.on("error", (err) => {
// 			console.error("WebSocket error:", err.message);
// 		});

// 		socket.on("disconnect", () => {
// 			console.log("Client disconnected");
// 			binanceSocket.close();
// 		});
// 	});
// }

// module.exports = handleSocketConnection;

// socketHandler.js

const WebSocket = require("ws");
require("dotenv").config();
const { cryptoNames, cryptoImages } = require("./assests/coin");

function handleSocketConnection(io) {
	io.on("connection", (socket) => {
		console.log("Socket connected");

		// Create a single WebSocket connection to Binance for all pairs
		const binanceSocket = new WebSocket(process.env.BINANCE_WS_URL);

		let cachedData = {}; // To store the latest trade data
		let updateInterval;

		binanceSocket.on("open", () => {
			console.log("Connected to Binance WebSocket for multiple currencies");
		});

		binanceSocket.on("message", (message) => {
			const tradeData = JSON.parse(message);
			//console.log("Trade Data:", tradeData); // Check if the data is correct

			const streamName = tradeData.stream; // Stream name to identify which symbol
			const symbol = streamName.split("@")[0].toUpperCase(); // Extract symbol (e.g., btcusdt, ethusdt)

			// Update the cached data for the specific symbol
			cachedData[symbol] = {
				price: parseFloat(tradeData.data.p), // Current trade price
				quantity: tradeData.data.q, // Trade quantity
				time: tradeData.data.T, // Trade time
				symbol: symbol, // Symbol (e.g., BTCUSDT, ETHUSDT)
				name: cryptoNames[symbol], // Name based on the symbol
				image: cryptoImages[symbol], // Image URL based on the symbol
			};
		});

		// Emit the cached data to the frontend every 10 seconds
		updateInterval = setInterval(() => {
			// Convert the cached data to an array for sending to the frontend
			const formattedData = Object.values(cachedData);
			if (formattedData.length > 0) {
				socket.emit("cryptoPrices", formattedData);
			}
		}, 5000);

		binanceSocket.on("close", () => {
			console.log("Binance WebSocket disconnected");
			clearInterval(updateInterval);
		});

		binanceSocket.on("error", (err) => {
			console.error("WebSocket error:", err.message);
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected");
			clearInterval(updateInterval);
			binanceSocket.close();
		});
	});
}

module.exports = handleSocketConnection;
