const express = require("express");
const { registerUser, login } = require("../controller/user.controller")
const userRouter = express.Router()

.post("/user/register", registerUser)
.post("/user/login", login)





module.exports = { userRouter };