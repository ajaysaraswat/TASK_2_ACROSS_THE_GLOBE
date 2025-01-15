const mongoose = require("mongoose");
const alertSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			//	required: true,
		},
		symbol: {
			type: String,
			required: true,
		},
		condition: {
			type: String,
			enum: ["greaterThan", "lessThan"],
			required: true,
		},
		targetPrice: {
			type: Number,
			required: true,
		},
		isTriggered: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
