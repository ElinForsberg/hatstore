import { Box, Button } from "@mui/material";
import Typography from '@mui/joy/Typography';
import { useOrderContext } from "../../context/OrderContext";
import Header from "../Header/Header";
import "./Orders.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";

function Orders() {
    const { orders, getOrders } = useOrderContext();
   const {loggedInUser} = useUser();

    useEffect(() => {
      getOrders();
    }, []); 

   
    return (
      <div className="ordersContainer">
        <Header />
        {loggedInUser ? (
          <>
            <Typography level="h2" sx={{ marginTop: "50px", marginBottom: "50px" }}>
              My Orders
            </Typography>
              {orders.map((order, index) => (
                <Box key={index} sx={{ marginBottom: "10px",borderRadius:"5px", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", padding: "8px", backgroundColor: "white" }}>
                  <Box sx={{ width: "50vw", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography level="h4">Order placed on: {order.created}</Typography>
                    <Typography level="h4">Total Sum: {order.totalSum} sek</Typography>
                  </Box>
                  <Box>
                    <Typography level="body-lg">Products:</Typography>
                      {order.products.map((product, productIndex) => (
                        <Box key={productIndex}>
                          <Typography level="body-md">{product.description}</Typography>
                          <Typography level="body-sm">Price: {product.price} {product.currency}</Typography>
                          <Typography level="body-sm">Quantity: {product.quantity}</Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              ))}
      
              <Link to="/">
                <Button>Go shopping</Button>
              </Link>
            </>
          ) : (
            <div className="container_second">
              <Typography level="body-lg">
                You must log in to view your orders.
              </Typography>
              <Link to="/login">
                <Button>LogIn</Button>
              </Link>
            </div>
          )}
    </div>
  );
}

export default Orders