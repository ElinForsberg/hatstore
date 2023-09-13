import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ProductProvider from "./context/ProductContext.tsx"
import UserProvider from './context/UserContext.tsx'
import OrderProvider from './context/OrderContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
 <UserProvider>
   <ProductProvider>
    <OrderProvider>
      <App />
    </OrderProvider>
    
  </ProductProvider>
 </UserProvider>

)
