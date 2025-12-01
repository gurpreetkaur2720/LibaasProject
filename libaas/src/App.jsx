import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Signup from "./components/Signup";
import Login from "./components/Login";

// My Orders Page ⭐
import MyOrders from "./pages/MyOrders";

// Category Pages
import LahoriKudiyan from "./pages/LahoriKudiyan";
import BollywoodBegums from "./pages/BollywoodBegums";
import AmbarsariApsaras from "./pages/AmbarsariApsaras";

// Info Pages
import AboutUs from "./pages/AboutUs";
import SizeChart from "./pages/SizeChart";

// Wishlist & Cart Pages
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import RefreshHandler from "./components/RefreshHandler";

// Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout Wrapper
function Layout({ children }) {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main
        style={{
          marginTop: hideLayout ? "0" : "80px",
          minHeight: "80vh",
          backgroundColor: "#fff",
        }}
      >
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

// App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ⭐ Wishlist & Cart */}
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />

          {/* ⭐ My Orders */}
          <Route path="/my-orders" element={<MyOrders />} />

          {/* ⭐ Category Pages */}
          <Route path="/lahori-kudiyan" element={<LahoriKudiyan />} />
          <Route path="/bollywood-begums" element={<BollywoodBegums />} />
          <Route path="/ambarsari-apsaras" element={<AmbarsariApsaras />} />

          {/* Info Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/size-chart" element={<SizeChart />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div
                style={{
                  textAlign: "center",
                  padding: "100px",
                  fontSize: "1.2rem",
                }}
              >
                <h2>404 — Page Not Found</h2>
                <p>Oops! The page you’re looking for doesn’t exist.</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
