require("dotenv").config();
const express = require("express");

const coinRouter = require("./routes/coin");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { default: axios } = require("axios");
const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
	res.render("home");
	console.log("API", process.env.COINGECKO_DEMO_API);
});

io.on("connection", (socket) => {
	console.log("socket connected");

	const fetchandemitdata = async () => {
		try {
			const responce = await axios.get(
				"https://api.coingecko.com/api/v3/coins/markets",
				{
					params: {
						vs_currency: "usd",
					},
					headers: {
						accept: "application/json",
						"x-cg-demo-api-key": process.env.COINGECKO_DEMO_API,
					},
				}
			);
			socket.emit("cryptoPrices", responce.data);
		} catch (err) {
			console.log("error in fetching data", err.message);
		}
	};
	setInterval(fetchandemitdata, 12000);

	socket.on("disconnected", () => {
		console.log("client disconnected");
	});
});

app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use("/", coinRouter);

server.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
