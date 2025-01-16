const express = require("express");
const {
	handlepostuser,
	handlegetsignin,
	handlepostsignin,
	handlegetuser,
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/user", handlepostuser);
userRouter.post("/user/signin", handlepostsignin);
userRouter.get("/user", handlegetuser);
userRouter.get("/user/signin", handlegetsignin);
userRouter.post("/user/logout", handlepostuser);

module.exports = userRouter;
