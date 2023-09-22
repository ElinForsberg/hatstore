import { ShoppingCart } from "@mui/icons-material";
import "./Header.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import MyDrawer from "../MyDrawer/MyDrawer";
import { useUser } from "../../context/UserContext";
import Person from '@mui/icons-material/Person';


function Header() {
    const [open, setOpen] = useState(false);
    const { loggedInUser, logout } = useUser()
    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    const handleLogout = async () => {
        await logout();
      };

  return (
    <div className="header">
        <div className="promo">
            <div>Limited offer!!! Get 20% off, use code: FALL23</div>
        </div>
        <div className="headerContainer">
            <div className="logoWrapper">
                <h1 className="logo">
                    <Link to="/">
                       HatStore
                    </Link>
                </h1>
                <div className="logoHat">
                    <i className="fa-brands fa-redhat fa-3x"></i>
                </div>   
            </div>
        <div className="btnWrapper">
             {!loggedInUser &&
                <Link to= "/login">
                    <Button variant="outlined" size="small" sx={{width:"150px"}}>LogIn /Register</Button>
                </Link>
             }
                { loggedInUser &&
                <div>
                    <div id="orderLink">
                        <Link to="/myorders">
                            <Button variant="outlined" size="small" sx={{width:"150px"}} >
                            <Person/>
                            My Orders
                            </Button>
                        </Link>
                    </div>
                        <Button variant="outlined" size="small" sx={{width:"150px"}} onClick={handleLogout}> LogOut </Button>
                </div>
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