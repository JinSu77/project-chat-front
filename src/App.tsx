import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import './App.css'

function App() {

  return (
   <>
   <Routes>
    <Route path="/register" element={<Register/> }/>
    <Route path="/" element={<Login/>}/>



   </Routes>
   
   
   </>
  )
}

export default App
