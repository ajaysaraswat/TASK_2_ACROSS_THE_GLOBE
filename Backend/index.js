const express = require("express");
const coinRouter = require("./routes/coin");
const path = require("path");
const app = express();
const PORT = 8000;

app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", coinRouter);

app.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
