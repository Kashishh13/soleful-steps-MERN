import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  
} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Login/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PlaceOrder from "./pages/PllaceOrder/PlaceOrder.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
 
    if (token) {
setIsAuthenticated(true)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    localStorage.removeItem("userID");

  };

  return (
    <>
      {isAuthenticated && <Navbar handleLogout={handleLogout} />}
      <Routes>
   <Route path="/" element={isAuthenticated ?( <Navigate to="/home" />  ) : (<Login setIsAuthenticated={setIsAuthenticated} /> )}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
        />
       
         <Route
          path="/order"
          element={isAuthenticated ? <PlaceOrder/> : <Navigate to="/" />}
        />
        
         <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/" />}
        />
         <Route
          path="/verify" 
          element={<Verify/>}
        />
         <Route
          path="/myorders" 
          element={isAuthenticated ? <MyOrders /> : <Navigate to="/" />}
        />
      </Routes>
      {isAuthenticated && <Footer />}
    </>
  );
};

export default App;
