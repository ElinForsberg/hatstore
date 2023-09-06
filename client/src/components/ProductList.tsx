
import { useProductContext } from "../context/ProductContext";

function ProductList() {
const { products,  addToCart, cart } = useProductContext();

// console.log(products);


  return (
    <div>
         <h1>Product List</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price.unit_amount} {product.price.currency}</p>
            <img src={product.image} alt={product.name} />
            <button onClick={() => addToCart(product.price.id)}>Add to cart</button>
            
          </li>
        ))}
      </ul>
      <div>Cart</div>
      <ul>
        {cart.map((cartItem, index) => (
            <li key= {index}>
                
                <p>Quantity: {cartItem.quantity}</p>
                {/* <p>Product: {cartItem.product}</p> */}
            </li>
        ))}
      </ul>
      {/* <button onClick={handlePayment}>Pay me </button> */}
    </div>
   
  )
}

export default ProductList;