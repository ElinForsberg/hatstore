require("dotenv").config();
const fs = require("fs");
const path = require("path")
const filePath = path.join(__dirname, "..", "data", "order.json")

const getOrders = async (req, res) => {
    const { email } = req.session;
    try {
        const fileData = fs.readFileSync(filePath, "utf8");
        const orderData = JSON.parse(fileData);
    
        // const order = orderData.find((order) => order.customer=== username);
        const personalOrders = orderData.filter((order) => order.email === email);
        if (personalOrders.length === 0) {
            res.status(400).json("No orders found for this user");
          } else {
            res.status(200).json(personalOrders);
          }
 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server error"})
    }
}

module.exports = {getOrders}