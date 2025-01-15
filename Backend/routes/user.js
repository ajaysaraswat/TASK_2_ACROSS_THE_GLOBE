const express = require("express");
const { handlepostuser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/user", handlepostuser);

module.exports = userRouter;
