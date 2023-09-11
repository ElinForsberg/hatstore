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
    <div className="header">
        <div className="promo">
            <div>JUST NU!! Få 20% rabatt, använda koden FALL23</div>
        </div>
        <div className="headerContainer">
    
            <div className="logoWrapper">
            {/* <Link to="/"> */}
                <h1 className="logo">Welcome to HatStore</h1>
            {/* </Link> */}
            
                
            {/* <FontAwesomeIcon icon={faRedhat} style={{color: "#01060e",}} />      */}
            
        </div>
        <div className="btnWrapper">
        {!loggedInUser &&
            <Link to= "/login">
                <Button variant="outlined" size="small" sx={{width:"150px"}}>LogIn /Register</Button>
            </Link>
            }
        { loggedInUser &&
            <Button variant="outlined" size="small" sx={{width:"150px"}}> LogOut </Button>
        }    
            <Button variant="outlined" size="small" sx={{width:"150px"}} onClick={open ? handleClose : handleOpen} >
                ShoppingCart
                <ShoppingCart className="shopping-cart-icon" />
                <MyDrawer open={open} setOpen={setOpen} />
            </Button>
        </div>
        
        
    </div>
    </div>
  )
}

export default Header