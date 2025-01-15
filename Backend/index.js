const express = require("express");
require("dotenv").config();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const handleSocketConnection = require("./socketHandler");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);

mongoose
	.connect("mongodb://127.0.0.1:27017/crypto")
	.then(() => console.log("momgoDb connected"))
	.catch((err) => console.log("connection error", err));

// Initialize socket handler
handleSocketConnection(io);

app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
	res.render("home");
	console.log("Server API initialized");
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
