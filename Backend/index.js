const express = require("express");
require("dotenv").config();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const handleSocketConnection = require("./socketHandler");
const userRouter = require("./routes/user");
const alertRouter = require("./routes/alert");
const coinRouter = require("./routes/coin");
const cookieParsar = require("cookie-parser");
const { restrictedtousersigninonly } = require("./middlewares/auth");
const { connecttoMongoDB } = require("./connection");
const CryptoPrice = require("./models/CryptoPrice");
const client = require("./Redis/client");

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);

connecttoMongoDB("mongodb://127.0.0.1:27017/crypto");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParsar());
// app.use(checkForAuthenticationCookie("uid"));

// Initialize socket handler
handleSocketConnection(io);

app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/alert/:symbol", (req, res) => {
	const symbol = req.params.symbol;
	res.render("alert", {
		symbol: symbol,
	});
	console.log("Server API initialized");
});

// app.get("/curr", async (req, res) => {
// 	const cacheValue = await client.get("coinsprice");
// 	if (cacheValue) {
// 		console.log("yes cached data");
// 		return res.json(JSON.parse(cacheValue));
// 	}
// 	const data = await CryptoPrice.find({});
// 	await client.set("coinsprice", JSON.stringify(data));
// 	await client.expire("coinsprice", 30);
// 	return res.json(data);
// });
app.use("/", coinRouter);
app.use("/", userRouter);
app.use("/", restrictedtousersigninonly, alertRouter);

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
