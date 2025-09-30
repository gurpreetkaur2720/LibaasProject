// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

// Import category pages
import LahoriKudiyan from "./pages/LahoriKudiyan";
import BollywoodBegums from "./pages/BollywoodBegums";
import AmbarsariApsaras from "./pages/AmbarsariApsaras";

// Import footer + info pages
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import SizeChart from "./pages/SizeChart";

// ✅ Layout wrapper
function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar & Footer only on Login/Signup
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar />}
      <div style={{ marginTop: hideLayout ? "0" : "80px", minHeight: "80vh" }}>
        {children}
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Categories */}
          <Route path="/lahori-kudiyan" element={<LahoriKudiyan />} />
          <Route path="/bollywood-begums" element={<BollywoodBegums />} />
          <Route path="/ambarsari-apsaras" element={<AmbarsariApsaras />} />

          {/* Footer links */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/size-chart" element={<SizeChart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
