const Alert = require("../models/alert");
const User = require("../models/user");

const handlepostAlert = async (req, res) => {
	try {
		const { userId, symbol, condition, targetPrice } = req.body;
		if (!userId || !symbol || !condition || !targetPrice) {
			return res.status(400).json({ error: "all target fields are required" });
		}
		const userExists = await User.findById(userId);
		if (!userExists) return res.status(404).json({ error: "User not found" });
		const newAlert = Alert.create({
			userId: userId,
			symbol: symbol,
			condition: condition,
			targetPrice: targetPrice,
		})
		(await newAlert).save();
		return res.status(201).json({
			message: "Alert created sucessfully",
			alerts: newAlert,
		});
	} catch (err) {
		console.log("Error creating alert", err.message);
		res.status(500).json({ error: "internal server error" });
	}
};

module.exports = {
	handlepostAlert,
};
