const express = require("express");
require("dotenv").config();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const handleSocketConnection = require("./socketHandler");

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);

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
