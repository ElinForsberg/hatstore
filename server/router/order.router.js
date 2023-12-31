const express = require("express");
const {getOrders} = require("../controller/order.controller")

const { auth } = require("../middlewares")

const orderRouter = express.Router()


.get("/orders", auth, getOrders)

module.exports = { orderRouter };