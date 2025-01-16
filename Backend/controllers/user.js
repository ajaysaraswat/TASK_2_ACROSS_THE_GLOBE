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

		// return res
		// 	.status(201)
		// 	.json({ status: "Created Successfully", message: user._id });
		return res.redirect("/user/signin");
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const handlepostsignin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const uid = await User.matchPasswordandGenerateToken(email, password);

		res.cookie("uid", uid);
		res.render("home");
		// return res.json({ message: uid });
	} catch (err) {
		return res.redirect("/");
		//return res.json({ message: err.message });
	}
};

const handlelogout = (req, res) => {
	res.clearCookie("uid").redirect("/user/signin");
};

const handlegetuser = (req, res) => {
	return res.render("register");
};

const handlegetsignin = (req, res) => {
	return res.render("login");
};
module.exports = {
	handlepostuser,
	handlepostsignin,
	handlelogout,
	handlegetuser,
	handlegetsignin,
};
