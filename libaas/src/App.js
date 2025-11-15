// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

// Category Pages
import LahoriKudiyan from "./pages/LahoriKudiyan";
import BollywoodBegums from "./pages/BollywoodBegums";
import AmbarsariApsaras from "./pages/AmbarsariApsaras";

// Info Pages
import AboutUs from "./pages/AboutUs";
import SizeChart from "./pages/SizeChart";

// ⭐ Wishlist Page
import Wishlist from "./pages/Wishlist";

// ⭐ Cart Page
import Cart from "./pages/Cart";

// ✅ Layout Wrapper (handles Navbar/Footer visibility)
function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar & Footer only on Login/Signup
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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ⭐ Wishlist Page */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* ⭐ Cart Page */}
          <Route path="/cart" element={<Cart />} />

          {/* Category Pages */}
          <Route path="/lahori-kudiyan" element={<LahoriKudiyan />} />
          <Route path="/bollywood-begums" element={<BollywoodBegums />} />
          <Route path="/ambarsari-apsaras" element={<AmbarsariApsaras />} />

          {/* Info Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/size-chart" element={<SizeChart />} />

          {/* 404 Fallback */}
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
