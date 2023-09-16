import { Box, Button } from "@mui/material";
import Typography from '@mui/joy/Typography';
import { useOrderContext } from "../../context/OrderContext";
import Header from "../Header/Header";
import "./Orders.css"
import { Link } from "react-router-dom";

function Orders() {
    const { orders } = useOrderContext();
   
   
    return (
        <div className="ordersContainer">
        <Header/>

          <Typography level="h2" className="orderTitle">My Orders</Typography>
      
          
          {orders.map((order, index) => (
            <Box key={index} sx={{borderBottom:"1px solid black", marginBottom:"10px"}}>
             <Box sx={{width: "80vw",display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
             <Typography level="h3">Order placed on: {order.created}</Typography>
             <Typography level="h3">Total Sum: {order.totalSum} sek</Typography>
             {/* <p>Order placed on: {order.created}</p>
              <p>Total Sum: {order.totalSum} sek</p> */}
             </Box>
              
              <Box>
              <Typography level="h4">Products:</Typography>
                
                {order.products.map((product, productIndex) => (
                  <Box key={productIndex}>
                    <Typography level="body-lg">{product.description}</Typography>
                    <Typography level="body-md">Price: {product.price} {product.currency}</Typography>
                    <Typography level="body-md">Quantity: {product.quantity}</Typography>
                    {/* <p> {product.description}</p>
                    <p>Price: {product.price} {product.currency}</p>
                    <p>Quantity: {product.quantity}</p>
                     */}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        <Link to="/">
            <Button>Go shopping</Button>
        </Link>
         
        </div>
      );
      

          }

export default Orders