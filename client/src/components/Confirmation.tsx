

import  { useOrderContext } from "../context/OrderContext";

function Confirmation() {

 
  const { isPaymentVerified  } = useOrderContext();
  // useEffect(() => {

  //   const sessionId = localStorage.getItem("session-id")

  //   const verifyPayment = async () => {
  //     const response = await fetch(
  //       "/api/verify-session", 
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({sessionId}),
  //       }
  //       );
  //       const { verified } = await response.json()

  //       if(verified){
  //         setIsPaymentVerified(true)
  //         localStorage.removeItem("session-id")
  //       }  else {
  //         setIsPaymentVerified(false)
  //       }

  //   };
  //   verifyPayment();
  // }, [])

  return (
    isPaymentVerified ?
    <div>Tack för ditt köp</div> :
    <div> Ditt köp gick inte igenom </div>
  )
}

export default Confirmation