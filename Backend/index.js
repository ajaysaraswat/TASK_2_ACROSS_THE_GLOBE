const express = require("express");
const axios = require("axios");
const coinRouter = require("./routes/coin");
const app = express();
const PORT = 8000;

app.use("/", coinRouter);

app.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
