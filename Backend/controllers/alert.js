const Alert = require("../models/alert");
const User = require("../models/user");
const sendEmail = require("../services/sendEmail");

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
		});
		// (await newAlert).save();
		return res.status(201).json({
			message: "Alert created sucessfully",
			alerts: newAlert,
		});
	} catch (err) {
		console.log("Error creating alert", err.message);
		res.status(500).json({ error: "internal server error" });
	}
};

//function to monitor and check alerts

async function monitorAlerts(latestPrices) {
	try {
		const alerts = await Alert.find({ isTriggered: false });
		for (const alert of alerts) {
			console.log("alert", alert);
			const { userId, symbol, condition, targetPrice } = alert;
			if (latestPrices[symbol]) {
				const currentPrice = latestPrices[symbol].price;
				console.log("current price", currentPrice.price);
				const conditionMet =
					(condition === "greaterThan" && currentPrice > targetPrice) ||
					(condition === "lessThan" && currentPrice < targetPrice);
				console.log("condition met", conditionMet);

				if (conditionMet) {
					alert.isTriggered = true;
					await alert.save();

					const user = await User.findById(userId);
					if (user) {
						user.alerts.push(alert._id);
						await user.save();

						//send email
						sendEmail(user.email, symbol, currentPrice, condition, targetPrice);
					}
				}
			}
		}
	} catch (err) {
		console.log("Error monitoring alerts", err);
	}
}

module.exports = {
	handlepostAlert,
	monitorAlerts,
};
