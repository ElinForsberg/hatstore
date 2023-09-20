require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { authorize } = require("./user.controller");
const filePath = path.join(__dirname, "..", "data", "order.json")

const getOrders = async (req, res) => {
  authorize
    const email  = req.session.email;
    try {
        const fileData = fs.readFileSync(filePath, "utf8");
        const orderData = JSON.parse(fileData);
    
        
        const personalOrders = orderData.filter((order) => order.email === email);
        if (personalOrders.length === 0) {
            res.status(203).json("No orders found for this user");
          } else {
            res.status(200).json(personalOrders);
          }
 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server error"})
    }
}

module.exports = {getOrders}