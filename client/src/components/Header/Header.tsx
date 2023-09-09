import { ShoppingCart } from "@mui/icons-material";
import "./Header.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import MyDrawer from "../MyDrawer/MyDrawer";
import { useUser } from "../../context/UserContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header() {
    const [open, setOpen] = useState(false);
    const { loggedInUser } = useUser()
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <div className="headerContainer">
        <div className="logoWrapper">
            <h1>Welcome to HatStore</h1>
            
             
          
            {/* <FontAwesomeIcon icon={faRedhat} style={{color: "#01060e",}} />      */}
            
        </div>
        <div className="btnWrapper">
        {!loggedInUser &&
            <Link to= "/login">
                <Button variant="outlined">LogIn /Register</Button>
            </Link>
            }
        { loggedInUser &&
            <Button variant="outlined" sx={{marginLeft:5}}> LogOut </Button>
        }    
            <Button variant="outlined" onClick={open ? handleClose : handleOpen} >
                ShoppingCart
                <ShoppingCart className="shopping-cart-icon" />
                <MyDrawer open={open} setOpen={setOpen} />
            </Button>
        </div>
        
        
    </div>
  )
}

export default Header