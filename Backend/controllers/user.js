const User = require("../models/user");

const handlepostuser = async (req, res) => {
	try {
		const body = req.body;
		if (!body) return res.status(400).send({ message: "invalid body" });
		const user = await User.create({
			fullname: body.fullname,
			email: body.email,
			password: body.password,
		});

		return res
			.status(201)
			.json({ status: "Created Successfully", message: user._id });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const handlepostsignin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const uid = await User.matchPasswordandGenerateToken(email, password);

		res.cookie("uid", uid);
		return res.redirect("/");
	} catch (err) {
		return res.redirect("/user/signup", {
			message: "Invalid user or password",
		});
	}
};

const handlelogout = (req, res) => {
	res.clearCookie("uid").redirect("/user/signin");
};
module.exports = {
	handlepostuser,
	handlepostsignin,
	handlelogout,
};
