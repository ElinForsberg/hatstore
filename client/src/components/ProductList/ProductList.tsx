
import { useProductContext } from "../../context/ProductContext";
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import "./ProductList.css"
import { Grid } from "@mui/material";

function ProductList() {
const { products,  addToCart,  } = useProductContext();

  return (
    <div className="cardContainer">
      <Grid container columns={2} gap={3} direction="row" justifyContent="center" alignItems="center">
        {products.map((product, index) => (
          <Card key= {index}sx={{ width: 320, marginBottom: "30px", boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }} >
            <div >
              <Typography level="title-lg">{product.name}</Typography>
              <Typography level="body-sm">{product.description}</Typography>
            </div>
              <AspectRatio minHeight="120px" maxHeight="200px" >
                <img
                  src={product.image}
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            <CardContent orientation="horizontal" >
              <div >
                <Typography level="body-xs">Price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {product.price.unit_amount} {product.price.currency}
                </Typography>
              </div>
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                  onClick={() => addToCart(product.price.id, product.name, product.image, product.price.unit_amount, product.price.currency)}
                >
                  Add to cart
                </Button>
            </CardContent>  
          </Card>
        ))}
      </Grid>  
    </div>
  )
}

export default ProductList;