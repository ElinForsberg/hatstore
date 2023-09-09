import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";


interface IProductContext {
    products: ProductData[];
    setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
    listProducts: () => void;
    useCupon: () => void;
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    handlePayment: () => void;
    addToCart: (productId: string, productName: string, productImage: string, productPrice: string, ProductCurrency: string) => void;
}

interface ProductData {
    name: string;
    default_price: ProductPrice;
    description: string;
    images: string;
    image: string;
    id:string;
    product:string;
    price: ProductPrice;
    
}

interface ProductPrice {
    currency: string;
    unit_amount: string;
    id: string;
}

interface CartItem {
    product: string;
    quantity: number;
    name: string;
    price: string;
    currency: string;
    image: string;
   
}

const defaultValues = {
    products: [],
    setProducts: () => [],
    listProducts: () => {},
    handlePayment: () => {},
    cart: [],
    setCart: () => [],
    addToCart: () => {},
    useCupon: () => {}
}



const ProductContext = createContext<IProductContext>(defaultValues);
export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({children}: PropsWithChildren) => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const { loggedInUser } = useUser()
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
                    id: product.id,
                    price: {
                        currency: product.default_price.currency,
                        unit_amount: (parseFloat(product.default_price.unit_amount) / 100).toFixed(2),
                        id: product.default_price.id
                    }
                }));
               
               
                setProducts(mappedProducts);
                console.log(data);
                console.log(mappedProducts);
                
               
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(() => {
        listProducts();  
        
            
    }, []);

    async function handlePayment() {
        if(loggedInUser){
            const response = await fetch(
                "http://localhost:3000/api/create-checkout-session", 
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(cart ),
                }
                );
          
                if (!response.ok) {
                  // Handle the response here
                  return;
                }
              const { url } = await response.json();
              window.location = url;
        } else {
            console.log("you are not logged in");
            
        }
    

    };

    function addToCart(productId: string, productName: string, productImage: string, productPrice: string, productCurrency: string) {
        // Check if the product is already in the cart
        const existingCartItem = cart.find((item) => item.product === productId);

        if (existingCartItem) {
            // If the product is already in the cart, update its quantity
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.product === productId
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
                    product: productId,
                    
                    quantity: 1, // Initialize with a quantity of 1

                    name: productName,

                    image: productImage,

                    price: productPrice,

                    currency: productCurrency,

                   
                },
                
                
            ]);
            console.log(cart);
            
        }
    }

   
    async function useCupon () {
        try {
            
                const response = await fetch(
                    "http://localhost:3000/api/create-checkout-session/coupon"
                );
                    const data = await response.json();
                    if (response.status === 200 || response.status === 304) {
                            // setCupon(data);
                            console.log(data);
                            
        
    }  
     }     catch (err) {
          console.log(err);
        }
    }

    // if (response.status === 200 || response.status === 304) {
    //     setLoggedInUser(data);
    //     console.log(data);
        
    //   }

    // } catch (err) {
    //   console.log(err);
    // }

return (
    <ProductContext.Provider
    value={{
        products,
        setProducts,
        listProducts,
        cart,
        setCart,
        handlePayment,
        addToCart,
        useCupon
        
    }}
    >
        {children}
    </ProductContext.Provider>
);
};

export default ProductProvider;