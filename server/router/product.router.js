const express = require("express");
const { getProducts } = require("../controller/product.controller")
const productRouter = express.Router()

.get("/products", getProducts)






module.exports = { productRouter };