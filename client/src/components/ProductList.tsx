
import { useProductContext } from "../context/ProductContext";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

function ProductList() {
const { products,  addToCart, cart, handlePayment } = useProductContext();

// console.log(products);


  return (
    <div>
      <div>
      {products.map((product, index) => (
         <Card key= {index}sx={{ width: 320 }}>
         
      <div >
      
        <Typography level="title-lg">{product.name}</Typography>
        <Typography level="body-sm">{product.description}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={product.image}
          loading="lazy"
          alt=""
          
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
          {product.price.unit_amount} {product.price.currency}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          onClick={() => addToCart(product.price.id, product.name, product.image, product.price.unit_amount, product.price.currency)}
        >
          Add to cart
        </Button>
      </CardContent>
       
    </Card>
    ))}
    </div>
         {/* <h1>Product List</h1>
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
      </ul> */}
      <div>
      <div>Cart</div>
      <ul>
        {cart.map((cartItem, index) => (
            <li key= {index}>

                <p>Name: {cartItem.name}</p>
                <p>Quantity: {cartItem.quantity}</p>
                
                {/* <p>Product: {cartItem.product}</p> */}
            </li>
        ))}
      </ul>
      </div>
     
      <button onClick={handlePayment}>Pay me </button>
    </div>
   
  )
}

export default ProductList;