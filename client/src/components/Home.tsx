import { useState } from "react";


function Home() {
const [cart, setCart] = useState(
    [
        {
        product: "price_1NmZeuApvy7495PLOwpFBANi",
        quantity: 2,
    },
    ]
) 

    async function handlePayment() {
     
        const response = await fetch(
        "http://localhost:3000/create-checkout-session", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cart),
        }
        );
  
        if (!response.ok) {
          // Handle the response here
          return;
        }
      const { url } = await response.json();
      window.location = url;

    } 

  return (
    <div>
        <div>home</div>
        <button onClick={handlePayment}>Pay me </button>
    </div>
  );
  }

export default Home;
  