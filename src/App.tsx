import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import './App.css'
import Dashboard from "./containers/dashboard/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const AuthenticatedRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.authentication.token);

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  
  return <Outlet />;
}

function App() {
  return (
   <>
   <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route element={<AuthenticatedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 
          Mettre les routes qui nécessitent une authentification ici
        */}
      </Route>

      <Route path="*" element={<h1>404</h1>}/>
   </Routes>
   </>
  )
}

export default App
