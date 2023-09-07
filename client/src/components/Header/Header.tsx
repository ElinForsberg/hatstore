import { ShoppingCart } from "@mui/icons-material";
import "./Header.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import MyDrawer from "../MyDrawer/MyDrawer";


function Header() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <div>
        <h1>Welcome to HatStore</h1>
        <Button variant="outlined" onClick={open ? handleClose : handleOpen} >
        ShoppingCart
        <ShoppingCart className="shopping-cart-icon" />
        <MyDrawer open={open} setOpen={setOpen} />
        </Button>
        <Link to= "/login">
        <Button variant="outlined">LogIn /Register</Button>
        </Link>
    </div>
  )
}

export default Header