const express = require("express");

const { registerCheckout, getCoupon } = require("../controller/checkout.controller")
const { auth } = require("../middlewares")

const checkoutRouter = express.Router()

.post("/create-checkout-session",registerCheckout)

.get("/create-checkout-session/coupon", getCoupon)




module.exports = { checkoutRouter };