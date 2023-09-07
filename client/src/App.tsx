import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import Confirmation from "./components/Confirmation";
import Login from "./components/Login/Login";



function App() {
  
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/confirmation" element={<Confirmation/>}/> 
      <Route path="/login" element={<Login/>}/>     
    </Routes>
   </BrowserRouter>
  )
}

export default App
