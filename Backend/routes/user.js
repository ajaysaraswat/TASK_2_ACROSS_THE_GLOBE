const express = require("express");
const { handlepostuser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/user", handlepostuser);
userRouter.post("/user/signin", handlepostuser);
userRouter.post("/user/logout", handlepostuser);

module.exports = userRouter;
