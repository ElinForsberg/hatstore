require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cookieSession = require("cookie-session");
// require("express-async-errors");

const { userRouter } = require("./router/user.router");
const {checkoutRouter} = require("./router/checkout.router")
const {productRouter} = require("./router/product.router")

const app = express();
app.use(express.json());

const CLIENT_URL = "http://127.0.0.1:5173";

//Middlewares
app.use(
    cors ({
        origin: "*",
})
);

app.use(
    cookieSession({
      name: "session",
      keys: ["aVeryS3cr3tK3y"],
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
  );

//add routes
app.use("/api", userRouter);
app.use("/api", checkoutRouter);
app.use("/api", productRouter);

// app.post("/create-checkout-session", async(req, res) => {
//     try {
//         const session = await stripe.checkout.sessions.create({
//             line_items: req.body.map((item) => {

//                 return {
//                     price: item.product,
//                     quantity: item.quantity
//                 };
//             }),

//             mode: "payment",
//             success_url: `${CLIENT_URL}/confirmation`,
//             cancel_url: CLIENT_URL,
            
//         });
//         res.status(200).json({url: session.url})
//     } catch (error) {
//         console.log(error.message);
//         res.status(400).json("det gick inte bra....")
//     }
// })




app.listen(3000, () => console.log("server is up and running...."));