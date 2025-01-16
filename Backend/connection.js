const mongoose = require("mongoose");

const connecttoMongoDB = (url) => {
	mongoose
		.connect(url)
		.then(() => console.log("mongodb connected"))
		.catch((err) => console.log("Error", err));
};

module.exports = {
	connecttoMongoDB,
};
