const express = require("express");

const { registerCheckout } = require("../controller/checkout.controller")

const checkoutRouter = express.Router()

.post("/create-checkout-session", registerCheckout)






module.exports = { checkoutRouter };