import { Routes, Route } from "react-router-dom";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
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
