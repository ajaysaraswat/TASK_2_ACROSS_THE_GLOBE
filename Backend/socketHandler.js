// socketHandler.js
const WebSocket = require("ws");
const { cryptoNames, cryptoImages } = require("./assests/coin");

function handleSocketConnection(io) {
	io.on("connection", (socket) => {
		console.log("Socket connected");

		// Create a single WebSocket connection to Binance for all 20 pairs
		const binanceSocket = new WebSocket(process.env.BINANCE_WS_URL);

		binanceSocket.on("open", () => {
			console.log("Connected to Binance WebSocket for multiple currencies");
		});

		binanceSocket.on("message", (message) => {
			const tradeData = JSON.parse(message);
			console.log("Trade Data:", tradeData); // Check if the data is correct

			const streamName = tradeData.stream; // stream name to identify which symbol
			const symbol = streamName.split("@")[0].toUpperCase(); // Extract symbol (e.g., btcusdt, ethusdt)

			// Prepare data for sending to the frontend
			const formattedData = [
				{
					price: parseFloat(tradeData.data.p), // Current trade price
					quantity: tradeData.data.q, // Trade quantity
					time: tradeData.data.T, // Trade time
					symbol: symbol, // Symbol (e.g., BTCUSDT, ETHUSDT)
					name: cryptoNames[symbol], // Name based on the symbol
					image: cryptoImages[symbol], // Image URL based on the symbol
				},
			];

			// Emit the data to the client
			socket.emit("cryptoPrices", formattedData);
		});

		binanceSocket.on("close", () => {
			console.log("Binance WebSocket disconnected");
		});

		binanceSocket.on("error", (err) => {
			console.error("WebSocket error:", err.message);
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected");
			binanceSocket.close();
		});
	});
}

module.exports = handleSocketConnection;
