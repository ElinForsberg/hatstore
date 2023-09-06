
import ProductList from "./ProductList";
import { useProductContext } from "../context/ProductContext";


function Home() {

  const {  handlePayment } = useProductContext();



  return (
    <div>
        <div>Welcome to HatStore</div>
        <ProductList/>
        <button onClick={handlePayment}>Pay me </button>
    </div>
  );
  }

export default Home;
  