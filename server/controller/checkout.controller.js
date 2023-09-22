require("dotenv").config();
const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173";
const path = require("path")
const filePath = path.join(__dirname, "..", "data", "order.json")

const registerCheckout = async (req,res) => {
    
        try {
            const session = await stripe.checkout.sessions.create({
                
                line_items: req.body.map((item) => {
                    return {
                        price: item.product,
                        quantity: item.quantity,                     
                    };                  
                }),               
                customer: req.session.id,
                mode: "payment",
                success_url: `${CLIENT_URL}/confirmation`,
                cancel_url: CLIENT_URL,
                allow_promotion_codes: true,              
            });
            res.status(200).json({url: session.url, sessionId: session.id})
            // console.log(session);           
        } catch (error) {
            console.log(error.message);
            res.status(400).json("det gick inte bra....")
        } 
    }
   
const verifyPayment = async (req,res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
        
        if(session.payment_status !== "paid") {
            return res.status(400).json({verified: false});
        }
        const products = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
        const createdDate = new Date(session.created * 1000);
        const formattedDate = createdDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use AM/PM

    });
        const order = {
            created:formattedDate, // Convert timestamp to date
            customer: session.customer_details.name,
            email: session.customer_details.email,
            totalSum: (parseFloat( session.amount_total) / 100).toFixed(2),
            products: products.data.map((item) => ({
              description: item.description,
              quantity: item.quantity,
              price: (parseFloat(item.price.unit_amount) / 100).toFixed(2),
              
              currency: item.price.currency,
              total: (parseFloat(item.amount_total) / 100).toFixed(2),
               
            })),
        };
        console.log("ORDER", order)
        
        let orderData = [];
        try {
            const fileData = fs.readFileSync(filePath, "utf8");
             orderData = JSON.parse(fileData);
            } catch (err){
                console.log(err);
              }
        orderData.push(order);
        fs.writeFileSync(filePath, JSON.stringify(orderData, null, 2));
       
         res.status(200).json( {verified: true} )      
    } catch(err) {
            console.log(err);
    }
}

module.exports = { registerCheckout, verifyPayment }