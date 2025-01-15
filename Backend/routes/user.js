const express = require("express");
const { handlepostuser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/user", handlepostuser);

module.exports = userRouter;
