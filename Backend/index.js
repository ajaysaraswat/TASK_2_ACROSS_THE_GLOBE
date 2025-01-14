const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
	return res.json({ message: "success " });
});

app.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
