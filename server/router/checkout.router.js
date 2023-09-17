const express = require("express");

const { registerCheckout, verifyPayment } = require("../controller/checkout.controller")
const { auth } = require("../middlewares")

const checkoutRouter = express.Router()

.post("/create-checkout-session",registerCheckout)

.post("/verify-session", verifyPayment)

module.exports = { checkoutRouter };