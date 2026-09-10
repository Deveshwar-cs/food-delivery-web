import {useState, useEffect} from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import MyOrder from "./pages/MyOrders/MyOrder.jsx";
import {useDarkMode} from "./hooks/useDarkMode.js"; // ← NEW
import "./dark-mode.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isDark, toggleDark] = useDarkMode(); // ← NEW

  // Overflow lock lives here, not inside LoginPopup
  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLogin]);

  return (
    <>
      <ScrollToTop />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        {/* Pass isDark + toggleDark down so Navbar can render the toggle button */}
        <Navbar
          setShowLogin={setShowLogin}
          isDark={isDark} // ← NEW
          onToggleDark={toggleDark} // ← NEW
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
