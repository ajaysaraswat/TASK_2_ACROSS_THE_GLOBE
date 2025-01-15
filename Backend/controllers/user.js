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
		return res.redirect("/");
	}
};

module.exports = {
	handlepostuser,
};
