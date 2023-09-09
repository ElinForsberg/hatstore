

require("dotenv").config();
// const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173";


const registerCheckout = async (req,res) => {
    
        try {
            const session = await stripe.checkout.sessions.create({
                
                line_items: req.body.map((item, customer) => {
    
                    return {
                        price: item.product,
                        quantity: item.quantity,
                        
                    };
                    
                }),
                
                customer: req.session.id,
                mode: "payment",
                success_url: `${CLIENT_URL}/confirmation`,
                cancel_url: CLIENT_URL,
               
                
            });
            res.status(200).json({url: session.url})
            console.log(session);
            
        } catch (error) {
            console.log(error.message);
            res.status(400).json("det gick inte bra....")
        } 
    }
   

    const getCoupon = async (req,res) => {
        try {
        const stripe = require('stripe')('sk_test_51NmZRIApvy7495PL1RTKWd4bOv1TZdrTHuH0IBefwXM3FL3x6hOuvNEMFzGzRqQCsbDKoHp90XdZDvjKu4qYZpp800EwDdFWB7');

        const coupon = await stripe.coupons.retrieve(
        'FALL23'
        );
    
        res.status(200).json(coupon);
        } catch(err){
        console.log(err);
        res.status(400).json("something went wrong")
    }
    }



module.exports = {registerCheckout, getCoupon}