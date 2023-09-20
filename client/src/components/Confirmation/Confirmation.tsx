

import { Typography } from "@mui/joy";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import  { useOrderContext } from "../../context/OrderContext";
import Header from "../Header/Header";
import "./Confirmation.css"

function Confirmation() {
  const { isPaymentVerified  } = useOrderContext();
  
  return (
    isPaymentVerified ?
      <div>
        <Header/>
        <div className="paymentWrapper">
          <Typography level={"h2"}>Thank you for your purchase </Typography>
          <FavoriteBorderIcon/>
        </div>
      </div> :
      <div>
          <Header/>
        <div className="paymentWrapper">
          <Typography level={"h2"}>Sorry, your purchase did not go through...</Typography> 
        </div>
      </div>   
  )
}

export default Confirmation