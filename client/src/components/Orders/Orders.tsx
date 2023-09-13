import { Box } from "@mui/material";
import { useOrderContext } from "../../context/OrderContext";
import Header from "../Header/Header";


function Orders() {
    const { orders } = useOrderContext();
   
   
    return (
        <div>
        <Header/>
          <h2>My orders</h2>
          
          {orders.map((order, index) => (
            <Box key={index} sx={{borderBottom:"2px solid black"}}>
              
              <p>Order placed on: {order.created}</p>
              <p>Total Sum: {order.totalSum}</p>
              <Box>
                <p>Products</p>
                {order.products.map((product, productIndex) => (
                  <Box key={productIndex}>
                    <p> {product.description}</p>
                    <p>Price: {product.price} {product.currency}</p>
                    <p>Quantity: {product.quantity}</p>
                    
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </div>
      );
      

          }

export default Orders