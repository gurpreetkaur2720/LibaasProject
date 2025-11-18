import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages

import Signup from "./components/Signup";
import Login from "./components/Login";

// Category Pages
import LahoriKudiyan from "./pages/LahoriKudiyan";
import BollywoodBegums from "./pages/BollywoodBegums";
import AmbarsariApsaras from "./pages/AmbarsariApsaras";

// Info Pages
import AboutUs from "./pages/AboutUs";
import SizeChart from "./pages/SizeChart";

// ⭐ Wishlist & Cart Pages
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

// ✅ Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ✅ Layout Wrapper
function Layout({ children }) {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar />}
      <main style={{ marginTop: hideLayout ? "0" : "80px", minHeight: "80vh", backgroundColor: "#fff" }}>
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

// ✅ App Component
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ⭐ Wishlist & Cart */}
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />

          {/* Category Pages */}
          <Route path="/lahori-kudiyan" element={<LahoriKudiyan />} />
          <Route path="/bollywood-begums" element={<BollywoodBegums />} />
          <Route path="/ambarsari-apsaras" element={<AmbarsariApsaras />} />

          {/* Info Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/size-chart" element={<SizeChart />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", padding: "100px", fontSize: "1.2rem" }}>
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
