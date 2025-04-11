import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Header from "./components/Header.jsx";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div className="text-center mt-10">Route not found</div>} />
      </Routes>
    </>
  );
}

export default App;

