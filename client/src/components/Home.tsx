
import ProductList from "./ProductList";
import { useProductContext } from "../context/ProductContext";
import Header from "./Header/Header";


function Home() {

  



  return (
    <div>
        <Header/>
        <ProductList/>
        {/* <button onClick={handlePayment}>Pay me </button> */}
    </div>
  );
  }

export default Home;
  