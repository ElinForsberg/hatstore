require("dotenv").config();
// const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://127.0.0.1:5173";

const getProducts = async (req,res) => {
    try {
        const products= await stripe.products.list({
            limit: 10,
            expand: ["data.default_price"],
         });
         res.status(200).json(products)
    } catch(err){
        console.log(err);
        res.status(400).json("something went wrong")
    }
 
} 


module.exports = {getProducts}

