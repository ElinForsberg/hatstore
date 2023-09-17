const express = require("express");
const { registerUser, login, authorize, logout} = require("../controller/user.controller")

const userRouter = express.Router()

.post("/user/register", registerUser)
.post("/user/login", login)
.get("/user/authorize", authorize)
.post("/user/logout", logout)



module.exports = { userRouter };