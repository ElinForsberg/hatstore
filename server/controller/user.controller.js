require("dotenv").config();
const bcrypt = require("bcrypt");
const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const path = require("path")
const filePath = path.join(__dirname, "..", "data", "user.json")


const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    let userData = [];

    try {
      const fileData = fs.readFileSync(filePath, "utf8");
             userData = JSON.parse(fileData);
      const existingUser = userData.find((user) => user.username === username || user.email === email) 
      if(!existingUser){
        const customer = await stripe.customers.create({
          email: email,
          name: username
      }) 
      
       const hashedPassword = await bcrypt.hash(password, 10);

       const newUser = {
          id: customer.id,
          username, 
          password: hashedPassword,
          email: customer.email,
        };
      
          const fileData = fs.readFileSync(filePath, "utf8");
           userData = JSON.parse(fileData);
           
            userData.push(newUser);
            fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
           
            res.status(200).json({newUser})
            
      }  else {
        return res.status(409).json({message: "user already exists"});
      }  
   
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error"});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const fileData = fs.readFileSync(filePath, "utf8");
        const userData = JSON.parse(fileData);
    
        const user = userData.find((user) => user.email=== email);
        if(!user) {
            return res.status(404).json({message: "user not found"});
        }

const passwordMatch = await bcrypt.compare(password, user.password);

if(passwordMatch) {
    req.session = user;
    res.json({message: "login successful", user: {username: user.username, email: user.email}});
    
} else {
    res.status(401).json({message: "Authentication failed. Incorrect password."})
}

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server error"})
    }
}

  const authorize= async (req, res) => {
    if (!req.session.id) {
      return res.status(401).json("You are not logged in");
    }
    return req.session,
    res.status(200).json(req.session);
    
  }

  const logout = async (req,res) => {
    if (!req.session.id) {
      return res.status(400).json("Cannot logout when you are not logged in");
    }
    req.session = null;
    res.status(204).json(null);
  }
  



module.exports = {registerUser, login, authorize, logout}