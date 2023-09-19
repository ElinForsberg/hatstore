import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home/Home";
import Confirmation from "./components/Confirmation/Confirmation";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";


function App() {
  
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/confirmation" element={<Confirmation/>}/> 
      <Route path="/login" element={<Login/>}/> 
      <Route path="/myorders" element={<Orders/>}/> 
    </Routes>
   </BrowserRouter>
  )
}

export default App
