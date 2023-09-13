const express = require("express");
const {getOrders} = require("../controller/order.controller")
const orderRouter = express.Router()

.get("/orders", getOrders)

module.exports = { orderRouter };