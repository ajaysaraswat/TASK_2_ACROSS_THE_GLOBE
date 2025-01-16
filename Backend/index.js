const express = require("express");
require("dotenv").config();
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const handleSocketConnection = require("./socketHandler");
const userRouter = require("./routes/user");
const alertRouter = require("./routes/alert");
const cookieParsar = require("cookie-parser");
const { restrictedtousersigninonly } = require("./middlewares/auth");
const { connecttoMongoDB } = require("./connection");

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

app.get("/", (req, res) => {
	res.render("home");
	console.log("Server API initialized");
});
app.use("/", userRouter);
app.use("/", restrictedtousersigninonly, alertRouter);

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
