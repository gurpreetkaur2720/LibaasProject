import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";

// Import images
import bb1 from "../assets/images/bb1.jpg";
import bb2 from "../assets/images/bb2.jpg";
import bb3 from "../assets/images/bb3.jpg";
import bb4 from "../assets/images/bb4.jpg";
import bb5 from "../assets/images/bb5.jpg";
import bb6 from "../assets/images/bb6.jpg";
import bb7 from "../assets/images/bb7.jpg";

// ✅ Banner image
import bollywoodBanner from "../assets/images/bb5.jpg";

export default function BollywoodBegums() {
  const products = [
    { image: bb1, name: "Noor-e-Nazaakat", price: 1999 },
    { image: bb2, name: "Zehra", price: 1799 },
    { image: bb3, name: "Sitara", price: 1899 },
    { image: bb4, name: "Mehekti Shaam", price: 1699 },
    { image: bb5, name: "Chandni Raat", price: 2099 },
    { image: bb6, name: "Husn-e-Haya", price: 1999 },
    { image: bb7, name: "Gulzar-e-Ishq", price: 1899 },
  ];

  return (
    <div className="category-page">
      {/* ✅ Banner Section */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${bollywoodBanner})` }}
      >
        <div className="banner-content">
          <h1>Bollywood Begums</h1>
          <p>"Screen Se Real Life Tak"</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Bollywood Begums</h2>
        <div className="product-grid">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
