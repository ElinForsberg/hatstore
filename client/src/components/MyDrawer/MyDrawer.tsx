import "./MyDrawer.css";
import Drawer from "@mui/material/Drawer";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";
import { useUser } from "../../context/UserContext";

interface ShoppingDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


function MyDrawer({open, setOpen}: ShoppingDrawerProps ) {
  
  const {  cart, handlePayment } = useProductContext();
  const { loggedInUser } = useUser();

  const toggleDrawer = () => (event: { type: string; key: string; }) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(false);
  };

  return (
    <Drawer anchor="top" open={open} onClose={toggleDrawer()} >
      <div className="drawer">

        <CloseIcon className="close-drawer" onClick={handleButtonClick}></CloseIcon>

        
      <ul>
        {cart.map((cartItem, index) => (
            <div className="cartItem" key= {index}>
              
                <p>{cartItem.name}</p>
                <p>Quantity: {cartItem.quantity}</p>
                <div className="imgContainer">
                  <img src={cartItem.image} className="cartImg"/>
                </div>
                
                <p>Price: {cartItem.price} {cartItem.currency}</p>
                
            </div>
        ))}
      </ul>
      {!loggedInUser &&
          <div className="loginContainer">
            <div>
            You need to log in to proceed to checkout!!
            </div>
            <Link to="/login">
            <Button>LogIn</Button>
            </Link>
          </div>

      }
      {loggedInUser &&
        <div className="loginContainer">
          <Button className="cartBtn" variant="outlined" onClick={handlePayment}> Go to Checkout </Button>
        </div>
      }
      
      </div>
       
  
      
    </Drawer>
  );
}

export default MyDrawer