import React from "react";
import ProductCard from "../components/ProductCard";
import "../components/ProductCard.css";
import "../pages/PageStyles.css";

// ✅ Import images (exact 8 you want)
import bb1 from "../assets/images/bb1.jpg";
import bb2 from "../assets/images/bb2.jpg";
import pehrin11 from "../assets/images/pehrin11.jpg";
import bb4 from "../assets/images/bb4.jpg";
import pehrin10 from "../assets/images/pehrin10.jpg";
import pehrin13 from "../assets/images/pehrin13.jpg";
import pehrin12 from "../assets/images/pehrin12.jpg";
import pehrin1 from "../assets/images/pehrin1.jpg";

// ✅ Banner Image
import bannerImg from "../assets/images/pehrin8.jpg";

export default function LahoriKudiyan() {
  const products = [
    { image: bb1, name: "Afsana", price: 1299 },
    { image: bb2, name: "Mehnoor", price: 1399 },
    { image: pehrin11, name: "Noorjahan", price: 1499 },
    { image: bb4, name: "Gulzar", price: 1199 },
    { image: pehrin10, name: "Sahiba", price: 1599 },
    { image: pehrin13, name: "Rukhsana", price: 1699 },
    { image: pehrin12, name: "Dilruba", price: 1499 },
    { image: pehrin1, name: "Mehrunisa", price: 1399 },
  ];

  return (
    <div className="category-page">
      {/* ✅ Banner Section */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="banner-content">
          <h1>Lahori Kudiyan</h1>
          <p>“Nazakat, Shauq & Sheher di Shaan”</p>
        </div>
      </div>

      <div className="category-box">
        <h2 className="category-heading">Lahori Kudiyan</h2>
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
