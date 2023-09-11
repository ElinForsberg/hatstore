const express = require("express");
const { registerUser, login, authorize} = require("../controller/user.controller")

const userRouter = express.Router()

.post("/user/register", registerUser)
.post("/user/login", login)
.get("/user/authorize", authorize)




module.exports = { userRouter };