const express = require("express");
const coinRouter = require("./routes/coin");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", coinRouter);

server.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
