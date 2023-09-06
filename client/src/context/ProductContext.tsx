import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface IProductContext {
    products: ProductData[];
    setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
    listProducts: () => void;
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    handlePayment: () => void;
    addToCart: (product: ProductData) => void;
}

interface ProductData {
    name: string;
    default_price: string;
    description: string;
    images: string;
    image: string;
    id:string;
    product: string;
}

interface CartItem {
    product: string;
    quantity: number;
    
}

const defaultValues = {
    products: [],
    setProducts: () => [],
    listProducts: () => {},
    handlePayment: () => {},
    cart: [],
    setCart: () => [],
    addToCart: () => {}
}

const ProductContext = createContext<IProductContext>(defaultValues);
export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({children}: PropsWithChildren) => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    async function listProducts() {
        
        try {
            const response = await fetch(
                "http://localhost:3000/api/products"
            );
                const data = await response.json();
                
               const mappedProducts = data.data.map((product: ProductData) => ({
                    name: product.name,
                    description: product.description,
                    product: product.default_price,
                    image: product.images[0],
                    id: product.id 
                }));
                setProducts(mappedProducts);
                console.log(data);
               
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(() => {
        listProducts();  
        
            
    }, []);

    async function handlePayment() {
     
        const response = await fetch(
        "http://localhost:3000/api/create-checkout-session", 
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

    };

    function addToCart(product: ProductData) {
        // Check if the product is already in the cart
        const existingCartItem = cart.find((item) => item.product === product.product);

        if (existingCartItem) {
            // If the product is already in the cart, update its quantity
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.product === product.product
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                
                
            );
            console.log(cart);
            
        } else {
            // If the product is not in the cart, add it as a new item
            setCart((prevCart) => [
                ...prevCart,
                {
                
                    product: product.product,
                    quantity: 1, // Initialize with a quantity of 1
                },
                
                
            ]);
            console.log(cart);
            
        }
    }



return (
    <ProductContext.Provider
    value={{
        products,
        setProducts,
        listProducts,
        cart,
        setCart,
        handlePayment,
        addToCart
        
    }}
    >
        {children}
    </ProductContext.Provider>
);
};

export default ProductProvider;