const { getuser } = require("../services/auth");

const restrictedtousersigninonly = (req, res, next) => {
	const userId = req.cookies?.uid;
	if (!userId) return res.json({ message: "no userid find" });
	console.log("userId", userId);
	const user = getuser(userId);
	console.log("user", user);
	if (!user) return res.json({ message: "no user found" });
	req.User = user;
	next();
};

const checkauth = (req, res, next) => {
	const userId = req.cookies?.uid;
	const user = getuser(userId);
	req.user = user;
	next();
};
module.exports = {
	restrictedtousersigninonly,
	checkauth,
};
