const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { setuser } = require("../services/auth");
const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		alerts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Alert",
			},
		],
		salt: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) return;
	const salt = randomBytes(16).toString();
	const hashedPassword = createHmac("sha256", salt)
		.update(user.password)
		.digest("hex");
	this.salt = salt;
	this.password = hashedPassword;

	next();
});

userSchema.static(
	"matchPasswordandGenerateToken",
	async function (email, password) {
		const user = await this.findOne({ email });
		if (!user) throw new Error("User dont found");
		const salt = user.salt;
		const hashedPassword = user.password;
		const userProvidedHash = createHmac("sha256", salt)
			.update(password)
			.digest("hex");
		if (hashedPassword !== userProvidedHash) throw new Error("User dont found");
		const token = setuser(user);

		return token;
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
