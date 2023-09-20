import { PropsWithChildren, createContext, useContext,  useState } from "react";


interface IOrderContext {
    getOrders: () => void;
    orders: OrderData[];
    setOrders: React.Dispatch<React.SetStateAction<OrderData[]>>;
    isPaymentVerified: boolean;
    setIsPaymentVerified: React.Dispatch<React.SetStateAction<boolean>>;
    verifyPayment: () => void;
}

interface OrderData {
    created: string;
    customer: string;
    email: string;
    totalSum: number;
    products: OrderedProductData[];
}

interface OrderedProductData {
    map(arg0: (product: OrderedProductData) => { description: string; quantity: number; price: number; currency: string; }): unknown;
    description: string;
    quantity: number;
    price: number;
    currency: string;
}


const defaultValues = {
    getOrders: () => {},
    orders: [],
    setOrders: () => [],
    isPaymentVerified: false,
    setIsPaymentVerified: () => {},
    verifyPayment: () => {}
}

const OrderContext = createContext<IOrderContext>(defaultValues);
export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({children}: PropsWithChildren) => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [isPaymentVerified, setIsPaymentVerified] = useState(false)
    
    const sessionId = localStorage.getItem("session-id")

    const verifyPayment = async () => {
        const response = await fetch(
            "/api/verify-session", 
        {
             method: "POST",
            headers: {
            "Content-Type": "application/json"
             },
             body: JSON.stringify({sessionId}),
        }
        );
        const { verified } = await response.json()
        if(verified){
            setIsPaymentVerified(true)
            localStorage.removeItem("session-id")
        }  else {
            setIsPaymentVerified(false)
        }
    };
        async function getOrders() {
           
                try {
                    const response = await fetch(
                        "/api/orders"
                    );
                        const data = await response.json();
                        if(response.status ===203) {
                            setOrders([])
                        }
                        if(response.ok) {
                            const mappedOrders = data.map((order: OrderData) => ({
                                created: order.created,
                                customer: order.customer,
                                email: order.email,
                                totalSum: order.totalSum,
            
                                products: order.products.map((product: OrderedProductData) => ({
                                    description: product.description,
                                    quantity: product.quantity,
                                    price: product.price,
                                    currency: product.currency
                                }))
                            }));
                            setOrders(mappedOrders)
                        }                              
                }catch(err){
                    console.log(err);
                }
    }
   
    return (
        <OrderContext.Provider
        value={{
        getOrders,
        orders,
        setOrders,
        isPaymentVerified,
        setIsPaymentVerified,
        verifyPayment
        }}
        >
            {children}
        </OrderContext.Provider>
    );
    };
    
    export default OrderProvider;





